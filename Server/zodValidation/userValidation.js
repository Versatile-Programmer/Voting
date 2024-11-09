// Import Zod
const { z } = require('zod');

// Define the Zod validation schema
const signupValidationSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50, 'Username cannot exceed 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'), // Adjust the min length as needed
  walletId: z.string().optional(), // Optional field
  department: z.enum(['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Physics', 'Chemistry'], {
    errorMap: () => ({ message: 'Invalid department selection' }),
  }),
  clubs: z.array(z.string()).optional(), // Array of strings, optional
  // isAdmin:z.boolean().optional(),
});

const loginValidationSchema = z.object({
  email :z.string().email("Invalid email address"),
  password: z.string().min(6,"password must be at least 6 character long")
});
module.exports = {signupValidationSchema,loginValidationSchema};
