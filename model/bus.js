///////////////////////  ROUTE FOR BUS  /////////////////////////
const getBuses = `SELECT * FROM buses`
const checkUserId = `SELECT COUNT(*) AS count FROM users WHERE id = ?`
const fetchSingleBus = `SELECT * FROM buses WHERE id = ?`
const getBusesUsers = `SELECT b.*, u.full_name FROM buses b LEFT JOIN users u ON b.user_id = u.id`
const InsertBus = `INSERT INTO buses (user_id, bus_number, bus_plate_number, bus_type, capacity) VALUES (?, ?, ?, ?, ?)`
const destroyBus = `DELETE FROM buses WHERE id = ?`
const updateBusQuery = `UPDATE buses SET user_id = ?, bus_number = ?, bus_plate_number = ?, bus_type = ?, capacity = ? WHERE id = ?`
const checkBusNumber = `SELECT COUNT(*) AS count FROM buses WHERE bus_number = ?`
const checkBusPlateNumber = `SELECT COUNT(*) AS count FROM buses WHERE bus_plate_number = ?`

module.exports = {
    checkUserId, getBuses, fetchSingleBus, getBusesUsers, InsertBus, destroyBus, 
    updateBusQuery, checkBusNumber, checkBusPlateNumber
}

