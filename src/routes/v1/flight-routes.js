const express= require('express');

const{FlightMiddleware}=require('../../middlewares');

const{FlightController}= require('../../controllers');

const router=express.Router();

// /api/v1/flights POST
router.post('/', 
        FlightMiddleware.validateCreateRequest,
        FlightController.createFlight);

// /api/v1/flights GET
router.get('/', 
        FlightController.getFlights);  
        
// /api/v1/flights/id GET
router.get('/:id', 
        FlightController.getFlight); 
        
// /api/v1/flights/id DELETE
router.delete('/:id', 
        FlightController.deleteFlight); 

module.exports = router;