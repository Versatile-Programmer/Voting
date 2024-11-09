// file to define logic of signup etc
const bcrypt = require("bcrypt");
const user = require("../models/users");
const jwt = require("jsonwebtoken");
const signup =
    async (req, res) => {
        try {
            const { username, email, password, walletId, department, clubs  } = req.validateData;
            console.log("priting the req data",req.validateData);
            //console.log("name=>",name,"email=>",email,password,walletId,department,clubs)
            //console.log(req.validateData);
            const findUser = await user.findOne({ email });
            
            if (findUser) {
                return res.status(409).json({
                    message: "user already exists",
                    success: false
                })
            }
            console.log("code is correct");
            const newUser = await new user({ 
                username,
                email,
                password:await bcrypt.hash(password, 10),
                walletId,
                department,
                clubs
                }).save();
                console.log("printing the newuser=>",newUser)
                console.log("code is correcting");
                //await newUser.save();
                console.log("after saving the user in db")

            // console.log("code is corrected");
            // await user.create({
            //     name,
            //     email,
            //     password: await bcrypt.hash(password, 10),
            //     walletId,
            //     department,
            //     clubs
            // })
            // console.log('user created');
            // don't use create here as it will just create the instance but have very less flexibility when it comes to update password as it will create new instance instead of updating one.
            return res.status(201).json({
                message: "sign up successfully",
                success: true
            })
        }
        catch (error) {
            console.log("error=>",error)
            return res.status(500).json({
                
                message: "something went wrong",
                success: false
            })
        }
    }

const login = async (req, res) => {
    try {
        const { email, password } = req.validateData;
        const errMsg = "Authentication failed email or password is wrong";
        const findUser = await user.findOne({ email });
        console.log("printing the req.data=>",req.validateData)
        if (!findUser) {
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }
        const token = jwt.sign(
            { email: findUser.email, _id: findUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '2d', issuer : 'Voting app' }
        )
        console.log("priting after creating token=>",token)
        res.status(200).json({
            message: "login success",
            email,
            token,
            name: findUser.username,
            department:findUser.department,
            isAdmin:findUser.isAdmin,
            clubs:findUser.clubs,
            walletId:findUser.walletId,
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: "Error logging in",
             error,
             success: false 
            });
    }
}
module.exports = {
    signup, login
}