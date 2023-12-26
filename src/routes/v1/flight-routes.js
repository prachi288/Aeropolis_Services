const express= require('express');

const{FlightMiddleware}=require('../../middlewares');

const{FlightController}= require('../../controllers');

const router=express.Router();

// /api/v1/flights POST
router.post('/', 
        FlightMiddleware.validateCreateRequest,
        FlightController.createFlight); 
        
// /api/v1/flights?trips=DEL-MUM GET
router.get('/', 
        FlightController.getAllFlight); 

// /api/v1/flights/:id GET
router.get('/:id', 
        FlightController.getFlight); 
        
// /api/v1/flights/:id/seats PATCH
router.patch(
        '/:id/seats', 
        FlightMiddleware.validateUpdateSeatsRequest,
        FlightController.updateSeats); 
        
// /api/v1/flights/id DELETE
router.delete('/:id', 
        FlightController.deleteFlight); 

module.exports = router;