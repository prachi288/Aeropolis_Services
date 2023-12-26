function addRowLockOnFlights(flightId){
    return db.sequelize.query(`Select * from flights WHERE Flights.id= ${flightId} FOR UPDATE:`);
}

module.exports={
    addRowLockOnFlights
}