const {StatusCodes}=require('http-status-codes');

const {FlightRepository}=require('../repositories');

const AppError = require('../utils/error/app-error');

const flightRepository=new FlightRepository();

async function createFlight(data){
    console.log("inside flight services")
    try{
        const flight=await flightRepository.create(data);
        return flight;
    }catch(error){
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlights(){
    console.log("inside services")
    try{
        const flights=await flightRepository.getAll();
        return flights;
    }catch(error){
        throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteFlight(id) {
    try {
        const flight = await flightRepository.destroy(id);
        return flight;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createFlight,
    getFlights,
    getFlight,
    deleteFlight
}