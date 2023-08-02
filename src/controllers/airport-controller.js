const {StatusCodes}=require('http-status-codes');

const{AirportService}=require('../services');

const{SuccessResponse,ErrorResponse}=require('../utils/common');

/**
 * POST : /airports 
 * req-body {name: 'IGI', cityId: 5, code: 'DEL'}
 */

async function createAirport(req,res){
    console.log("Inside controller")
     try{
        const airport=await AirportService.createAirport({
            name: req.body.name,
            cityId: req.body.cityId,
            code: req.body.code,
            address: req.body.address
        })
        SuccessResponse.data= airport;
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

/**
 * GET : /airports 
 */

async function getAirports(req,res){
    console.log("Inside  Airport controller")
     try{
        const airports=await AirportService.getAirports()
        SuccessResponse.data= airports;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
     }catch(error){
        ErrorResponse.error=error;
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse);
     }
}

/**
 * POST : /airports/:id 
 * req-body {}
 */
async function getAirport(req, res) {
    try {
        const airports = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airports;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * POST : /airports/:id 
 * req-body {}
 */
async function deleteAirport(req, res) {
    try {
        const airports = await AirportService.deleteAirport(req.params.id);
        SuccessResponse.data = airports;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    deleteAirport
}
