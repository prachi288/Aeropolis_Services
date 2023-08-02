const CrudRepository=require('./Crud-repository');
const {Airport}=require('../models');

class AirportRepository extends CrudRepository{
    constructor(){
        console.log("Inside airport repo")
        super(Airport);
    }
}

module.exports= AirportRepository;