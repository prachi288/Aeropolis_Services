const CrudRepository=require('./Crud-repository');
const {Airport}=require('../models');

class AirportRepository extends CrudRepository{
    constructor(){
        console.log("Inside repo")
        super(Airport);
    }
}

module.exports= AirportRepository;