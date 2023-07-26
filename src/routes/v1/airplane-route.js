const express= require('express');

const{AirplaneMiddleware}=require('../../middlewares');

const{AirplaneController}= require('../../controllers');

const router=express.Router();

// /api/v1/airplanes POST
router.post('/', 
        AirplaneMiddleware.validateCreateRequest,
        AirplaneController.createAirplane);

module.exports = router;