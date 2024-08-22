///////////////////////  ROUTE FOR BOOKING  /////////////////////////
const fetchBookings = `SELECT * FROM bookings`
const checkUserId = `SELECT COUNT(*) AS count FROM users WHERE id = ?`
const checkScheduleID = `SELECT COUNT(*) AS count FROM schedules WHERE id = ?`
const checkCustomeID = `SELECT COUNT(*) AS count FROM customers WHERE id = ?`
const insertBooking = `INSERT INTO bookings (user_id, schedule_id, customer_id, number_of_seats, fare_amount, total_amount, date_of_booking, booking_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
const singleBooking = `SELECT * FROM bookings WHERE id = ?`
const updateBookingQuery = `UPDATE bookings SET user_id = ?, schedule_id = ?, customer_id = ?, number_of_seats = ?, fare_amount = ?, total_amount = ?, date_of_booking = ?, booking_status = ? WHERE id = ?`
const deleteBookingQuery = `DELETE FROM bookings WHERE id = ?`


module.exports = {
    fetchBookings,
    checkUserId,
    checkScheduleID, 
    checkCustomeID,
    insertBooking,
    singleBooking,
    updateBookingQuery,
    deleteBookingQuery
}

