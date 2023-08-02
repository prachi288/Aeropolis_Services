const express= require('express');

const{FlightMiddleware}=require('../../middlewares');

const{FlightController}= require('../../controllers');

const router=express.Router();

// /api/v1/flights POST
router.post('/', 
        FlightMiddleware.validateCreateRequest,
        FlightController.createFlight); 
        
// /api/v1/flights?trips=MUM-DEL GET
router.get('/', 
        FlightController.getAllFlight); 
        
// /api/v1/flights/id DELETE
router.delete('/:id', 
        FlightController.deleteFlight); 

module.exports = router;