const express= require('express');

const{AirportMiddleware}=require('../../middlewares');

const{AirportController}= require('../../controllers');

const router=express.Router();

// /api/v1/airports POST
router.post('/', 
        AirportMiddleware.validateCreateRequest,
        AirportController.createAirport);

// /api/v1/airports GET
router.get('/', 
        AirportController.getAirports);  
        
// /api/v1/airports/id GET
router.get('/:id', 
        AirportController.getAirport); 
        
// /api/v1/airports/id DELETE
router.delete('/:id', 
        AirportController.deleteAirport); 

module.exports = router;