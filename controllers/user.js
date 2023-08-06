import { User } from "../models/user.js";
import bcrypt from "bcrypt";


import { sendCookie } from "../utils/features.js";
import ErrorHandler from "./middleware/error.js";


// export const getAllUsers = async (req, res) => {
//     const users = await User.find({});
//     const keywords =req.query.keywords;
//     console.log(keywords);
  
//     res.json({
//       successs: true,
//       users,
//     });
//   };

  
export const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
    
      let  user = await User.findOne({email});
     
      if(user){
        return next(new ErrorHandlerler("user already exists",400));
    };
  
      const hashPassword =await bcrypt.hash(password,10);
      user = await User.create(
          {   name,
              email,
              password:hashPassword
          });
  
      
     sendCookie(user,res,"Registered Successfully",201);
    } catch (error) {
      next(error);
      
    }

    };

  export const getUserDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if(!user){
        return next(new ErrorHandler("user not found",400));
    };
    
      res.json({
        success: true,
        user,
      });
  
    } catch (error) {
      next(error);
      
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if(!user){
        return next(new ErrorHandler("user not found",400));
    };
      await user.deleteOne();
      
    
      res.json({
        success: true,
        message: "User is deleted",
      });
    } catch (error) {
      next(error);
      
    }
  };



  // export const login = async (req, res, next) => {
  //   console.log(req.body);
  //   try {
  //     const { email, password } = req.body;
  
  //     const user = await User.findOne({ email }).select("+password");
  
  //     if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));
  
  //     const isMatch = await bcrypt.compare(password, user.password);
  
  //     if (!isMatch)
  //       return next(new ErrorHandler("Invalid Email or Password", 400));
  
  //     sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  export const login = async (req, res, next) => {
    console.log("Login Request Body:", req.body);
    try {
        const { email, password } = req.body;

        console.log("Login Email:", email);

        const user = await User.findOne({email}).select("+password");

        console.log("Retrieved User:", user);

        if (!user) {
            console.log("User Not Found.");
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

        console.log("Stored Hashed Password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password Comparison Result:", isMatch);

        if (!isMatch) {
            console.log("Invalid Password.");
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

        console.log("Login Successful:", user.name);

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        console.error("Login Error:", error);
        next(error);
    }
};


export const  logout=  (req,res) => {

 try {
   res.status(200).cookie("token","",{
    expires : new Date(Date.now()),
    samesite : process.env.NODE_ENV==="Development" ? "lax":"none",
    secure : process.env.NODE_ENV==="Development" ? false:true,
  })
     .json({
       success :true,
       user: req.user,
   });
 } catch (error) {
  next(error);
  
 }
};


export const  getMyProfile=  (req,res) => {

    try {
      res.status(200).json({
          success :true,
          user: req.user,
      });
    } catch (error) {
      next(error);

    }
};