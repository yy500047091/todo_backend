import { Task } from "../models/Task.js";
import ErrorHandler from "./middleware/error.js";

export const newTask = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);
    
        

    const  {title,description}= req.body;
    console.log("Title:", title);
    console.log("Description:", description);
            await Task.create({
            title,
            description,
            user: req.user,
        });
    
    
        console.log("working2");
        
        res.status(201).json({
            sucess: true,
            message : "task added successfully",
        });

        
    } catch (error) {
        next(error);
        
    }
    
     
};


export const getMyTask = async (req,res,next) =>{
   try {
    const userid = req.user._id;
    const task = await Task.find({user :userid});//find task return array
     
    if(!task){
        return next(new ErrorHandler("Task  not found",404));
    }
    res.status(200).json({
      sucess:true,
      task,
    });
   } catch (error) {
    next(error);
    
   }

};
export const updateTask = async (req,res,next) =>{
    try {
        const {id} = req.params;
    // const id= = req.id;

    const task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task  not found",404));
    }
     task.isCompleted =!task.isCompleted;
     await task.save();




    res.status(200).json({
      sucess:true,
      message :" task updated ",
    });

        
    } catch (error) {
        next(error);
        
    }
};
export const deleteTask = async (req,res,next) =>{
    try {
        const {id} =req.params;
    const task = await Task.findById(id);
    

    if(!task){
        return next(new ErrorHandler("Task  not found",404));
    }
     await task.deleteOne();



    res.status(200).json({
      sucess:true,
      message :"task deleted",
    });

    } catch (error) {
        next(error);
        
    }
};