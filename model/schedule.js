//////////////////////////   ROUTE FOR SCHEDULE   ///////////////////
const fetSchedules = "SELECT * FROM schedules"
const checkUserId = `SELECT COUNT(*) AS count FROM users WHERE id = ?`
const getAllSchedules = 'SELECT s.*, u.full_name, b.bus_number, d.driver_name FROM schedules s INNER JOIN users u ON s.user_id = u.id INNER JOIN buses b ON s.bus_id = b.id INNER JOIN drivers d ON s.driver_id = d.id';
const fetchSingleSchedule = 'SELECT s.*, u.full_name, b.bus_number, d.driver_name FROM schedules s INNER JOIN users u ON s.user_id = u.id INNER JOIN buses b ON s.bus_id = b.id INNER JOIN drivers d ON s.driver_id = d.id WHERE s.id = ?';
const getSingleSch = 'SELECT * FROM schedules WHERE id = ?';
const checkBusId = `SELECT COUNT(*) AS count FROM buses WHERE id = ?`
const checkDriverId = `SELECT COUNT(*) AS count FROM drivers WHERE id = ?`
const insertSchedule = "INSERT INTO schedules (user_id, bus_id, driver_id, starting_point, destination, schedule_date, departure_time, estimated_arrival_time, fare_amount, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
const updateScheduleData = 'UPDATE schedules SET user_id = ?, bus_id = ?, driver_id = ?, starting_point = ?, destination = ?, schedule_date = ?, departure_time = ?, estimated_arrival_time = ?, fare_amount = ?, remarks = ? WHERE id = ?'
const destroySchedule = `DELETE FROM schedules WHERE id = ?`

module.exports = {
    fetSchedules, checkUserId, getAllSchedules, fetchSingleSchedule, getSingleSch,
    checkBusId, checkDriverId, insertSchedule, updateScheduleData, destroySchedule
}

