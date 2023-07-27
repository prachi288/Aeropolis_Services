const express=require('express');

const { InfoController }= require('../../controllers');
const airplaneRoutes=require('./airplane-route');

const router=express.Router();
console.log("Inside router")
router.get('/info',InfoController.info); 
router.use('/airplanes', airplaneRoutes);

module.exports=router;