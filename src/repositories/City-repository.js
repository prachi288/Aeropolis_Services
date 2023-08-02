const CrudRepository=require('./Crud-repository');
const {City}=require('../models');

class CityRepository extends CrudRepository{
    constructor(){
        console.log("Inside city repo")
        super(City);
    }
}

module.exports= CityRepository;