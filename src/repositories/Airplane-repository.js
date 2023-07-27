const CrudRepository=require('./Crud-repository');
const Airplane=require('../models');

class AirplaneRepository extends CrudRepository{
    constructor(){
        console.log("Inside repo")
        super(Airplane);
    }
}

module.exports= AirplaneRepository;