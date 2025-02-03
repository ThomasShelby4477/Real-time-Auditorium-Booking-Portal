const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

// Define the Booking model
const Booking = sequelize.define('Booking', {
  eventName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventCoordinator: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'  // Default status is 'pending'
  }
});

module.exports = Booking;
