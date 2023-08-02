const express=require('express');

const { InfoController }= require('../../controllers');
const airplaneRoutes=require('./airplane-route');
const cityRoutes=require('./city-routes');
const airportRoutes=require('./airport-routes');
const flightRoutes=require('./flight-routes');

const router=express.Router();
console.log("Inside router")
router.get('/info',InfoController.info); 
router.use('/airplanes', airplaneRoutes);
router.use('/cities',cityRoutes);
router.use('/airports',airportRoutes);
router.use('/flights',flightRoutes);

module.exports=router;