const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');  // Import sequelize instance
const Booking = require('./models/Booking');  // Import Booking model
const app = express();
const port = 3000;
const path = require('path');


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// API endpoint to check availability (Submit Booking Request)
app.post('/api/checkAvailability', async (req, res) => {
  const { eventName, eventDate, timeSlot, eventNumber, eventCoordinator } = req.body;

  if (!eventName || !eventDate || !timeSlot || !eventNumber || !eventCoordinator) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the time slot is already booked
    const existingBooking = await Booking.findOne({
      where: { eventDate, timeSlot, status: 'approved' }
    });

    if (existingBooking) {
      return res.status(200).json({ isAvailable: false, message: 'The auditorium is already booked for the selected time slot.' });
    }

    // Create a new booking and save it with pending status
    const newBooking = await Booking.create({
      eventName,
      eventDate,
      timeSlot,
      eventNumber,
      eventCoordinator,
      status: 'pending'
    });

    res.status(200).json({ isAvailable: true, message: 'Your booking request is pending admin approval.' });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while checking availability.', error: err.message });
  }
});

// Fetch pending approvals
app.get('/api/pendingApprovals', async (req, res) => {
  try {
    const pendingBookings = await Booking.findAll({ where: { status: 'pending' } });
    res.status(200).json(pendingBookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending bookings.', error: err.message });
  }
});

// Approve booking
app.post('/api/approveBooking', async (req, res) => {
  const { eventDate, timeSlot } = req.body;

  try {
    const booking = await Booking.findOne({
      where: { eventDate, timeSlot, status: 'pending' }
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found in pending approvals.' });
    }

    // Update the booking status to 'approved'
    booking.status = 'approved';
    await booking.save();

    res.status(200).json({ message: 'Booking approved successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving booking.', error: err.message });
  }
});

// Reject booking
app.post('/api/rejectBooking', async (req, res) => {
  const { eventDate, timeSlot } = req.body;

  try {
    const booking = await Booking.findOne({
      where: { eventDate, timeSlot, status: 'pending' }
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found in pending approvals.' });
    }

    // Update the booking status to 'rejected'
    booking.status = 'rejected';
    await booking.save();

    res.status(200).json({ message: 'Booking rejected successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting booking.', error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Serve the admin dashboard HTML
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});
// Serve the front-end HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join('E:/Extras/Auditorium/frontend/index.html'));
});
