class AppError extends error{
    constructor(message,statusCode){
        super(message);
        this.explanation=message,
        this.statusCode=statusCode
    }
}

module.exports=AppError;