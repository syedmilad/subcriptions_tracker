const errorMiddleware = (err, req, res, next) => {
    try {
        console.log("err==>", err)
        let error = {...err};
        error.message = err.message;
        console.log("error==>", error)

        //  Mongoose bad objectId
        if(err.name === "CastError"){
            const message = "Resource not found"
            error = new Error(message)
            error.statusCode = 401;
        }

        //  Mongoose dublicate key
        if(err.code === 1100){
            const message = "Duplicate Feild value Entered"
            error = new Error(message)
            error.statusCode = 400;
        }
        // Mongoose validation error
        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map((val)=> val.message)
            error = new Error(message.join(", "));
            error.statusCode = 400;
        }
        res.status(err.statusCode).json({success: false, error: error.message || "Server Error"});
    }
    catch(err) {
        next(err)
    }
}

export default errorMiddleware