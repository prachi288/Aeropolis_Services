const {StatusCodes}=require('http-status-codes');

const{AirplaneService}=require('../services');

const{SuccessResponse,ErrorResponse}=require('../utils/common');

/**
 * POST : /airplanes 
 * req-body {ModelNumber: 'airbus320', Capacity: 200}
 */

async function createAirplane(req,res){
    console.log("Inside controller")
     try{
        const airplane=await AirplaneService.createAirplane({
            ModelNumber: req.body.ModelNumber,
            Capacity: req.body.Capacity
        })
        SuccessResponse.data= airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
     }catch(error){
        ErrorResponse.error=error;
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse);
     }
}

module.exports={
    createAirplane
}
