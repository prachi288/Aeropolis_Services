const CrudRepository=require('./Crud-repository');
const {Flight}=require('../models');

class FlightRepository extends CrudRepository{
    constructor(){
        console.log("Inside airport repo")
        super(Flight);
    }
}

module.exports= FlightRepository;