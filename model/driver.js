////////////// ROUTE FOR DRIVER ////////////////////
const tbDriver = "drivers"
const fetchDrivers = `SELECT * FROM drivers`
const checkUserId = `SELECT COUNT(*) AS count FROM users WHERE id = ?`
const fetchDriversUsers = `SELECT d.*, u.full_name FROM drivers d LEFT JOIN users u ON d.user_id = u.id`
const getSingleDriver = `SELECT * FROM ${tbDriver} WHERE id = ?`
const InsertDriver = `INSERT INTO drivers (user_id, driver_name, driver_contact) VALUES (?, ?, ?)`
const checkDriverName = `SELECT COUNT(*) AS count FROM drivers WHERE driver_name = ?`
const checkDriverContact = `SELECT COUNT(*) AS count FROM drivers WHERE driver_contact = ?`
const updateDriverQuery = `UPDATE drivers SET user_id = ?, driver_name = ?, driver_contact = ? WHERE id = ?`
const destroyDriver = `DELETE FROM ${tbDriver} WHERE id = ?`

module.exports = {
    fetchDrivers, checkUserId, fetchDriversUsers, getSingleDriver, InsertDriver, 
    checkDriverName, checkDriverContact, updateDriverQuery, destroyDriver
}

