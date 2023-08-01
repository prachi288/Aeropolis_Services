const express= require('express');

const{AirplaneMiddleware}=require('../../middlewares');

const{AirplaneController}= require('../../controllers');

const router=express.Router();

// /api/v1/airplanes POST
router.post('/', 
        AirplaneMiddleware.validateCreateRequest,
        AirplaneController.createAirplane);

// /api/v1/airplanes GET
router.get('/', 
        AirplaneController.getAirplanes);        

module.exports = router;