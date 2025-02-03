Auditorium Booking Portal
This project is an Auditorium Booking System designed to allow users to book an auditorium for events, while providing admins with a dashboard to manage and approve/reject bookings. It uses a combination of Frontend (HTML, CSS, JavaScript) and Backend (Node.js with Express, Sequelize ORM, and MySQL).

Features:
User Booking Form: Users can submit booking requests with details such as event name, coordinator, date, and time slot.
Availability Check: The system verifies if the auditorium is available for the selected time slot before confirming the booking.
Admin Dashboard: Admins can view pending bookings, approve or reject requests, and manage event schedules.
Real-time Notifications: Admins receive notifications for booking requests and updates.


Technologies Used:
  1) Frontend: HTML, CSS, JavaScript (vanilla), Fetch API for communication
  2) Backend: Node.js, Express, Sequelize ORM, MySQL
  3) Database: MySQL
  4) Real-time updates: JavaScript for handling asynchronous booking requests
  5) Authentication: (Optional depending on your implementation)


Setup:
    Clone the repository:
      git clone https://github.com/yourusername/auditorium-booking-system.git
    Install dependencies:
      cd auditorium-booking-system
      npm install    
    Set up the database using Sequelize:
      npx sequelize-cli db:create 
    Run the server:
      npm start
      
  Access the application in your browser at http://localhost:3000.
