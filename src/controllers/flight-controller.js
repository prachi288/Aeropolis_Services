const {StatusCodes}=require('http-status-codes');

const{FlightService}=require('../services');

const{SuccessResponse,ErrorResponse}=require('../utils/common');

/**
 * POST : /flights 
 * req-body {
 *  flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: 12,
 *  arrivalAirportId: 11,
 *  arrivalTime: '11:10:00',
 *  departureTime: '9:10:00',
 *  price: 2000
 *  boardingGate: '12A',
 *  totalSeats: 120
 * }
 */

async function createFlight(req,res){
    console.log("Inside controller")
     try{
        const flight=await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        })
        SuccessResponse.data= flight;
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
 * POST : /flights 
 * req-body {}
 */
async function getAllFlight(req, res) {
    try {
        const flights = await FlightService.getAllFlight(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * POST : /flights/:id 
 * req-body {}
 */
async function deleteFlight(req, res) {
    try {
        const flights = await FlightService.deleteFlight(req.params.id);
        SuccessResponse.data = flights;
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
    createFlight,
    getAllFlight,
    deleteFlight
}
