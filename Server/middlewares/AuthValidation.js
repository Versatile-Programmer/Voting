const { signupValidationSchema, loginValidationSchema} = require("../zodValidation/userValidation");

const signupMiddleware = (req, res, next) => {
    const userInfo = req.body;
    console.log("printing userInfo=>",userInfo)
    const signupInfoparse = signupValidationSchema.safeParse(userInfo);
    if (!(signupInfoparse.success)) {
        console.log("Inside signup middleware error")
        return res.status(400).json({ errors: signupInfoparse.error.errors });
    }
    req.validateData = signupInfoparse.data;
    console.log(req.validateData);
    console.log('i am here');
    next();
}
const loginMiddleware = (req,res,next)=>{
    const userInfo = req.body;
    console.log("priting user req.body=>",req.body)
    const loginInfoparse = loginValidationSchema.safeParse(userInfo);
    if (!(loginInfoparse.success)) {
        return res.status(400).json({ errors: loginInfoparse.error.errors });
    }
    req.validateData = loginInfoparse.data;

    console.log('after req.validatedata going to login fucntion')
    
    next();
}

module.exports = {
    signupMiddleware,loginMiddleware
}