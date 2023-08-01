const express = require('express');

const { CityController } = require('../../controllers');
const {CityMiddleware}=require('../../middlewares');


const router = express.Router();

// /api/v1/cities POST
router.post('/', 
        CityMiddleware.validateCreateRequest,
        CityController.createCity);

// /api/v1/cities GET
router.get('/', 
        CityController.getCities);  
        
// /api/v1/cities/id GET
router.get('/:id', 
        CityController.getCity); 
        
// /api/v1/cities/id DELETE
router.delete('/:id', 
        CityController.deleteCity); 

module.exports = router;