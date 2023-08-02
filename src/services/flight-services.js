const {StatusCodes}=require('http-status-codes');
const{Op}=require('sequelize');
const {FlightRepository}=require('../repositories');

const AppError = require('../utils/error/app-error');

const flightRepository=new FlightRepository();

async function createFlight(data){
    console.log("inside services")
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

async function getAllFlight(query) {
    let customFilter={};
    let sortFilter=[];
    const endingTripTime="23:59:00";
    //trips: MUM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split("-");
        if (departureAirportId !== arrivalAirportId) {
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
        } else {
            // Handle the case when the two airport IDs are the same (optional)
            console.log("Departure and arrival airport IDs cannot be the same.");
        }
    }
    //price=2644-7644
    if(query.price){
        [minPrice,maxPrice]=query.price.split("-");
        customFilter.price={
            [Op.between]:[minPrice,((maxPrice==undefined)?20000:maxPrice)]
        }
    }
    //travellers=1-0-0
    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    //03082023 (03-08-2023)
    if(query.tripDate){
        customFilter.departureTime={
            [Op.between]:[query.tripDate,query.tripDate+endingTripTime]
        }
    }
    //query.sort has the value "price_asc,name_desc,date_asc",
    //params is  ["price_asc", "name_desc", "date_asc"]
    if(query.sort){
        const params=query.sort.split(",");
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
    try {
        const flight = await flightRepository.getAllFlight(customFilter,sortFilter);
        return flight;
    } catch(error) {
        console.log(error);
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
    getAllFlight,
    deleteFlight
}