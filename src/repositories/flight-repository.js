const {Sequelize}=require('sequelize');
const CrudRepository=require('./Crud-repository');
const { Flight, Airplane, Airport,City, sequelize} = require('../models');
const db=require('../models');
const {addRowLockOnFlights}=require('./queries');

class FlightRepository extends CrudRepository{
    constructor(){
        console.log("Inside flight repo")
        super(Flight);
    }

    async getAllFlight(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include:[
                {
                    model:Airplane,
                    required:true,
                    as: 'airplaneDetail'
                },
                {
                    model:Airport,
                    required: true,
                    as: 'departureAirport',
                    on:{
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include:{
                        model:City,
                        required:true                    
                    }
                },
                {
                    model:Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on:{
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include:{
                        model:City,
                        required:true                    
                    }
                }
            ]
        });
        return response;
    }
    
    //if dec=true then decrease otherwise incrrease if false
    async upadteRemainingSeats(flightId,seats,dec=true){
        const transaction= await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight=await Flight.findByPk(flightId);
            if(+dec){
                await flight.decrement('totalSeats',{by: seats},{transaction: transaction});
            }else{
                await flight.increment('totalSeats',{by:seats},{transaction: transaction});
            }
            await transaction.commit;
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports= FlightRepository;