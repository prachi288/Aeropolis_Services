const {StatusCodes}=require('http-status-codes');

const {CityRepository}=require('../repositories');

const AppError = require('../utils/error/app-error');

const cityRepository=new CityRepository();

async function createCity(data){
    console.log("inside services")
    try{
        const city=await cityRepository.create(data);
        return city;
    }catch(error){
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    console.log("inside services")
    try{
        const cities=await cityRepository.getAll();
        return cities;
    }catch(error){
        throw new AppError('Cannot fetch data of all Citys', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The City you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the Cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The City you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the City', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
    getCities,
    getCity,
    deleteCity
}