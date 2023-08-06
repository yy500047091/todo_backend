class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;

    }
};


export const errorMiddleware =  (err,req,res,next)=>{
    err.message =err.essage || "Internal srver error";
    err.statuCode =err.statuCode || "500";

    return res.status(err.statuCode).json({
        sucess:false,
        message :err.message,

    });



};
export default  ErrorHandler;