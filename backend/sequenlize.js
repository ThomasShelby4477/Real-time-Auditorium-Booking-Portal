const { Sequelize } = require('sequelize');

// Set up Sequelize to connect to the MySQL database
const sequelize = new Sequelize('auditoriumBookings', 'root', 'mysql123', {
  host: 'localhost',    // or the host of your MySQL instance
  dialect: 'mysql',     // Using MySQL dialect
  logging: false,       // Optional: disables SQL query logging
});

module.exports = sequelize;
