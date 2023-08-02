const CrudRepository=require('./Crud-repository');
const {Airplane}=require('../models');

class AirplaneRepository extends CrudRepository{
    constructor(){
        console.log("Inside airplane repo")
        super(Airplane);
    }
}

module.exports= AirplaneRepository;