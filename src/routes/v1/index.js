const express=require('express');

const { InfoController }= require('../../controllers');
const airplaneRoutes=require('./airplane-route');
const cityRoutes=require('./city-routes')

const router=express.Router();
console.log("Inside router")
router.get('/info',InfoController.info); 
router.use('/airplanes', airplaneRoutes);
router.use('/cities',cityRoutes);

module.exports=router;