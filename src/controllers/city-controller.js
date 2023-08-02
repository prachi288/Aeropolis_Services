const {StatusCodes}=require('http-status-codes');

const{CityService}=require('../services');

const{SuccessResponse,ErrorResponse}=require('../utils/common');

/**
 * POST : /cities 
 * req-body {Name: Jabalpur}
 */

async function createCity(req,res){
    console.log("Inside city controller")
     try{
        const city=await CityService.createCity({
            name:req.body.name
        })
        SuccessResponse.data= city;
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
 * GET : /cities
 */

async function getCities(req,res){
    console.log("Inside controller")
     try{
        const cities=await CityService.getCities()
        SuccessResponse.data= cities;
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
 * GET : /cities/:id 
 * req-body {}
 */
async function getCity(req, res) {
    try {
        const cities = await CityService.getCity(req.params.id);
        SuccessResponse.data = cities;
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
 * DELETE : /cities/:id 
 * req-body {}
 */
async function deleteCity(req, res) {
    try {
        const cities = await CityService.deleteCity(req.params.id);
        SuccessResponse.data = cities;
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
    createCity,
    getCities,
    getCity,
    deleteCity
}
