import express from 'express';
import {getMyTask,deleteTask,updateTask ,newTask} from '../controllers/task.js';
import { isAuthenticated } from '../controllers/middleware/auth.js';

const router = express.Router();



router.post("/new",isAuthenticated, newTask);

router.get("/mytask",isAuthenticated, getMyTask);


router.route("/:id")
           .put(isAuthenticated,updateTask)
              .delete(isAuthenticated,deleteTask,(req,res,next)=>{
                next();
              });







export default router;