// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Student {
        uint id;
        bool exists;
        string name;
        string roll_no;
        uint[] clubs;
        address[] hashes;
    }

    struct Club {
        uint id;
        bool exists;
        string name;
        uint[] members;
        uint[] admins;
        uint[] waitlist;
    }

    struct ClubData {
        uint id;
        string name;
        bool isAdmin;
    }

    struct ClubCreationRequest {
        uint id;
        string club_name;
        uint creator_id;
    }

    struct ClubCreationRequestElaborate {
        uint id;
        string club_name;
        string creator_name;
        string creator_roll_no;
        uint creator_id;
    }

    struct Election {
        uint id;
        string name;
        string desc;
        string club_name;
        uint startTime;
        uint endTime;
        uint[] candidates; //ids of the candidates
        uint totalVotes;
        bool isOpen;
        mapping(uint => bool) hasVoted;
        mapping(uint => uint) candidateVotes;
    }

    Student[] student_list;
    uint nextStudentID;

    Club[] club_list;
    mapping(string => Club) club_name_to_club;// club name => club struct
    uint next_club_id;

    address superuser;

    ClubCreationRequest[] club_creation_requests;
    uint next_club_creation_request_id;

    mapping(uint => Election) public elections;// election ids => election struct


    constructor() {
        superuser = msg.sender;
    }

    //Deb ==============================================================================================================================
    function registerMyselfAsStudent(string calldata _name, string calldata _roll_no) public {
        require(!amIRegistered(), "Already registered.");
        require(!doesStudentExist(_roll_no), "Roll no. already registered");
        Student memory new_student;
        new_student.exists = true;
        new_student.id = nextStudentID++;
        new_student.name = _name;
        new_student.roll_no = _roll_no;
        student_list.push(new_student);
        student_list[student_list.length - 1].hashes.push(msg.sender);
    }

    function amIRegistered() public view returns (bool) {
        for (uint i = 0; i < student_list.length; i++) {
            for (uint j = 0; j < student_list[i].hashes.length; j++) {
                if (student_list[i].hashes[j] == msg.sender)
                    return true;
            }
        }
        return false;
    }

    function doesStudentExist(string calldata _roll_no) private view returns (bool) {
        for (uint i = 0; i < student_list.length; i++) {
            if (keccak256(abi.encode(student_list[i].roll_no)) == keccak256(abi.encode(_roll_no)))
                return true;
        }
        return false;
    }

    function createClub(string calldata _club_name) public {
        require(!club_name_to_club[_club_name].exists, "Club already exists.");
        ClubCreationRequest memory new_request;
        new_request.club_name = _club_name;
        new_request.creator_id = getMyInfo().id;
        new_request.id = next_club_creation_request_id++;
        club_creation_requests.push(new_request);
    }

    function getStudentDetails(string memory _roll_no) public view returns (Student memory) {
        for (uint i = 0; i < student_list.length; i++) {
            if (keccak256(abi.encode(student_list[i].roll_no)) == keccak256(abi.encode(_roll_no)))
                return student_list[i];
        }
        Student memory dummy;
        return dummy;
    }

    function getStudentDetailsById(uint id) public view returns (Student memory) {
        for (uint i = 0; i < student_list.length; i++) {
            if (student_list[i].id == id)
                return student_list[i];
        }
        Student memory dummy;
        return dummy;
    }

    function getStudentDetailsByHash(address my_hash) public view returns (Student memory) {
        for (uint i = 0; i < student_list.length; i++) {
            for (uint j = 0; j < student_list[i].hashes.length; j++) {
                if (my_hash == student_list[i].hashes[j]) {
                    return student_list[i];
                }
            }
        }
        Student memory dummy;
        return dummy;
    }

    function getClubCreationRequests() public view returns (ClubCreationRequestElaborate[] memory) {
        ClubCreationRequestElaborate[] memory result = new ClubCreationRequestElaborate[](club_creation_requests.length);
        Student memory temp;
        for (uint i = 0; i < club_creation_requests.length; i++) {
            result[i].id = club_creation_requests[i].id;
            result[i].club_name = club_creation_requests[i].club_name;
            temp = getStudentDetailsById(club_creation_requests[i].creator_id);
            result[i].creator_name = temp.name;
            result[i].creator_roll_no = temp.roll_no;
            result[i].creator_id = temp.id;
        }
        return result;
    }

    function addMemberToClub(uint id, uint club_id) private {
        for (uint i = 0; i < student_list.length; i++) {
            if (student_list[i].id == id) {
                student_list[i].clubs.push(club_id);
                for (uint j = 0; j < club_list.length; j++) {
                    if (club_list[j].id == club_id) {
                        club_list[j].members.push(id);
                    }
                }
            }
        }
    }

    function addMemberAdminToClub(uint id, uint club_id) private {
        for (uint i = 0; i < student_list.length; i++) {
            if (student_list[i].id == id) {
                student_list[i].clubs.push(club_id);
                for (uint j = 0; j < club_list.length; j++) {
                    if (club_list[j].id == club_id) {
                        club_list[j].members.push(id);
                        club_list[j].admins.push(id);
                    }
                }
            }
        }
    }

    function approveClubCreation(uint _id) public {
        for (uint i = 0; i < club_creation_requests.length; i++) {
            if (club_creation_requests[i].id == _id) {
                if (club_name_to_club[club_creation_requests[i].club_name].exists) {
                    break;
                } else {
                    Club memory new_club;
                    new_club.id = next_club_id++;
                    new_club.exists = true;
                    new_club.name = club_creation_requests[i].club_name;
                    club_list.push(new_club);
                    addMemberAdminToClub(club_creation_requests[i].id, new_club.id);
                    for (i = i + 1; i < club_creation_requests.length; i++) {
                        club_creation_requests[i - 1] = club_creation_requests[i];
                    }
                    club_creation_requests.pop();
                    break;
                }
            }
        }
    }

    function getMembers(string calldata _club_name) public view returns (uint[] memory) {
        require(club_name_to_club[_club_name].exists, "Club does not exist!");
        return club_name_to_club[_club_name].members;
    }

    function applyForClubMembership(string calldata _club_name) public {
        require(club_name_to_club[_club_name].exists, "Club does not exist");
        Student memory self = getStudentDetailsByHash(msg.sender);
        Club storage target = club_name_to_club[_club_name];
        for (uint i = 0; i < target.waitlist[i]; i++) {
            if (target.waitlist[i] == self.id) {
                revert();
            }
        }
        target.waitlist.push(self.id);
    }

    function approveClubMembership(string memory _club_name, string[] calldata roll_no) public {
        for (uint i = 0; i < roll_no.length; i++) {
            uint j;
            Student memory temp = getStudentDetails(roll_no[i]);
            for (j = 0; j < club_name_to_club[_club_name].waitlist.length; j++) {
                if (club_name_to_club[_club_name].waitlist[j] == temp.id) {
                    for (j = j + 1; j < club_name_to_club[_club_name].waitlist.length; j++) {
                        club_name_to_club[_club_name].waitlist[j-1] = club_name_to_club[_club_name].waitlist[j];
                    }
                    club_name_to_club[_club_name].waitlist.pop();
                }
            }
        }
    }

    // function promoteToAdmin(string calldata _club_name, string calldata _roll_no) public {}
    // function kickOut(string calldata _club_name, string calldata _roll_no) public {}
    // function getElectionVoterTurnout(uint _election_id) public view {}

   function getMyClubs() public view returns (ClubData[] memory) {
        require(amIRegistered(), "User not registered");
        Student memory temp = getStudentDetailsByHash(msg.sender);
        ClubData[] memory result = new ClubData[](temp.clubs.length);
        for (uint i = 0; i < temp.clubs.length; i++) {
            for (uint j = 0; j < club_list.length; j++) {
                if (temp.clubs[i] == club_list[j].id) {
                    result[i].id = club_list[j].id;
                    result[i].name = club_list[j].name;
                    bool found;
                    for (uint k = 0; k < club_list[j].admins.length; k++) {
                        if (club_list[j].admins[k] == temp.id) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        result[i].isAdmin = true;
                    }
                }
            }
        }
        return result;
    }

    function getMyInfo() public view returns (Student memory) {
        require(amIRegistered(), "User not registered");
        for (uint i = 0; i < student_list.length; i++) {
            for (uint j = 0; j < student_list[i].hashes.length; j++) {
                if (student_list[i].hashes[j] == msg.sender)
                    return student_list[i];
            }
        }
        return student_list[0];
    }

    function getNumberOfClubCreationRequests() public view returns (uint) {
        return club_creation_requests.length;
    }


    //Abhra ============================================================================================================================

    // Function to check if a user can create elections for a given club
    function canICreateElections(string memory _club_name) public view returns (bool) {
        Club memory club = club_name_to_club[_club_name];
        Student memory student = getStudentDetailsByHash(msg.sender);
        bool verdict = false;

        // Check if the student belongs to the club
        for (uint i = 0; i < student.clubs.length; i++) {
            if (student.clubs[i] == club.id) {
                verdict = true;
                break;
            }
        }

        // Check if the student is an admin of the club
        for (uint j = 0; j < club.admins.length; j++) {
            if (club.admins[j] == student.id) {
                verdict = verdict && true;
                break;
            } 
        }
        
        return verdict;
    }

    // Retrieve club details by ID
    function clubByID(uint id) public view returns (Club memory) {
        Club memory club_details;
        for (uint i = 0; i < club_list.length; i++) {
            if (club_list[i].id == id) return club_list[i];
        }
        return club_details;
    }

    // Function to create a new election
    function createElection(
        string calldata _name,
        string calldata _desc,
        string memory _club_name,
        uint _startTime,
        uint _endTime
    ) public returns (uint) {
        require(_startTime > block.timestamp, "Election can't start from past.");
        require(_startTime < _endTime, "Start time must be before end time.");
        require(canICreateElections(_club_name), "You're not authorized to create elections for your club.");

        uint electionId = uint(keccak256(abi.encodePacked(block.timestamp, _name, _desc)));
        Election storage new_election = elections[electionId];
        
        new_election.id = uint(electionId);
        new_election.name = _name;
        new_election.desc = _desc;
        new_election.club_name = _club_name;
        new_election.startTime = _startTime;
        new_election.endTime = _endTime;
        new_election.isOpen = false;

        return electionId;
    }

    // Function to open an election
    function openElection(uint _electionId) public {
        Election storage election = elections[_electionId];
        
        require(canICreateElections(election.club_name), "You're not authorized to open this election.");
        require(block.timestamp >= election.startTime, "Election start time has not yet been reached.");
        election.isOpen = true;
    }

    // Function to close an election
    function closeElection(uint _electionId) public {
        Election storage election = elections[_electionId];
        
        require(canICreateElections(election.club_name), "You're not authorized to close this election.");
        require(block.timestamp >= election.endTime, "Election end time has not yet been reached.");
        election.isOpen = false;
    }

    // Function to add a candidate to an election
    function addCandidateToElection(string calldata _roll_no, uint _electionId) public {
        Election storage election = elections[_electionId];

        require(canICreateElections(election.club_name), "You're not authorized to add candidates to this election.");

        // Verify that the roll number exists in the student list
        uint studentId;
        bool studentFound = false;

        for (uint i = 0; i < student_list.length; i++) {
            if (keccak256(abi.encodePacked(student_list[i].roll_no)) == keccak256(abi.encodePacked(_roll_no)) && student_list[i].exists) {
                studentId = student_list[i].id;
                studentFound = true;
                break;
            }
        }
        
        require(studentFound, "Invalid roll number: student not registered.");
        election.candidates.push(studentId);
    }


    // Function to get the list of candidates for an election
    function getCandidates(uint _electionId) public view returns (uint[] memory) {
        return elections[_electionId].candidates;
    }

    // Function to vote in an election
    function vote(uint _electionId, uint _candidateId) public {
        Election storage election = elections[_electionId];
        Student memory student = getStudentDetailsByHash(msg.sender);
        ClubData[] memory student_clubs = getMyClubs();
        
        require(election.isOpen, "Election is closed.");
        require(block.timestamp >= election.startTime && block.timestamp <= election.endTime, "Voting is not allowed at this time.");

        bool validClubMember = false;
        for (uint i = 0; i < student_clubs.length; i++) {
            if (keccak256(abi.encodePacked(election.club_name)) == keccak256(abi.encodePacked(student_clubs[i].name))) {
                validClubMember = true;
                break;
            }
        }
        require(validClubMember, "You are not eligible to vote in this election.");
        require(!election.hasVoted[student.id], "You have already voted.");

        bool validCandidate = false;
        for (uint i = 0; i < election.candidates.length; i++) {
            if (election.candidates[i] == _candidateId) {
                validCandidate = true;
                break;
            }
        }
        require(validCandidate, "Candidate is not valid for this election.");

        election.hasVoted[student.id] = true;
        election.candidateVotes[_candidateId]++;
        election.totalVotes++;
    }

    // Function to get the voter turnout for an election
    function getElectionVoterTurnout(uint _electionId) public view returns (uint) {
        return elections[_electionId].totalVotes;
    }

    // Function to get the results of an election
    function getResults(uint _electionId) public view returns (uint winner, uint votes) {
        Election storage election = elections[_electionId];
        
        require(!election.isOpen, "Election is still open.");

        uint highestVotes = 0;
        uint winningCandidate = 0;

        for (uint i = 0; i < election.candidates.length; i++) {
            uint candidate = election.candidates[i];
            uint candidateVotes = election.candidateVotes[candidate];

            if (candidateVotes > highestVotes) {
                highestVotes = candidateVotes;
                winningCandidate = candidate;
            }
        }

        return (winningCandidate, highestVotes);
    }
}