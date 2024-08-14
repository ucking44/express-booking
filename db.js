const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laravel_eloquent'
});

db.connect((err) => {
    if (err) 
        {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
        }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

function queryPromise(sql, values = [])
{
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(results)
            }
        })
    })
}

function processPromise(sql, values = []) 
{
    const goodPromise = new Promise((resolve, reject) => 
    {
        db.query(sql, values, (error, results) => {
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(results)
            }
        })
    })

    return goodPromise
}

const tbname = "users"
const getAllUsers = `SELECT * FROM users`
const singleUser = `SELECT * FROM ${ tbname } WHERE id = ?`
const dbQuery = `INSERT INTO ${ tbname } (full_name, contact_no, username, account_category, account_status, email_address, userpassword) VALUES (?, ?, ?, ?, ?, ?, ?)`
const updateDbQuery = `UPDATE ${ tbname } SET full_name = ?, contact_no = ?, username = ?, account_category = ?, account_status = ?, email_address = ?, userpassword = ? WHERE id = ?`
const deletDbUser = `DELETE FROM ${ tbname } WHERE id = ?`
const checkFullName = `SELECT COUNT(*) AS count FROM users WHERE full_name = ?`
const checkUsername = `SELECT COUNT(*) AS count FROM users WHERE username = ?`
const checkContactNo = `SELECT COUNT(*) AS count FROM users WHERE contact_no = ?`
const checkEmailAddress = `SELECT COUNT(*) AS count FROM users WHERE email_address = ?`
const checkUserId = `SELECT COUNT(*) AS count FROM users WHERE id = ?`


const getBuses = `SELECT * FROM buses`
const fetchSingleBus = `SELECT * FROM buses WHERE id = ?`
const getBusesUsers = `SELECT b.*, u.full_name FROM buses b LEFT JOIN users u ON b.user_id = u.id`
const InsertBus = `INSERT INTO buses (user_id, bus_number, bus_plate_number, bus_type, capacity) VALUES (?, ?, ?, ?, ?)`
const destroyBus = `DELETE FROM buses WHERE id = ?`
const updateBusQuery = `UPDATE buses SET user_id = ?, bus_number = ?, bus_plate_number = ?, bus_type = ?, capacity = ? WHERE id = ?`
const checkBusNumber = `SELECT COUNT(*) AS count FROM buses WHERE bus_number = ?`
const checkBusPlateNumber = `SELECT COUNT(*) AS count FROM buses WHERE bus_plate_number = ?`


const tbDriver = "drivers"
const fetchDrivers = `SELECT * FROM drivers`
const fetchDriversUsers = `SELECT d.*, u.full_name FROM drivers d LEFT JOIN users u ON d.user_id = u.id`
const getSingleDriver = `SELECT * FROM ${tbDriver} WHERE id = ?`
const InsertDriver = `INSERT INTO drivers (user_id, driver_name, driver_contact) VALUES (?, ?, ?)`
const checkDriverName = `SELECT COUNT(*) AS count FROM drivers WHERE driver_name = ?`
const checkDriverContact = `SELECT COUNT(*) AS count FROM drivers WHERE driver_contact = ?`
const updateDriverQuery = `UPDATE drivers SET user_id = ?, driver_name = ?, driver_contact = ? WHERE id = ?`
const destroyDriver = `DELETE FROM ${tbDriver} WHERE id = ?`




module.exports = { 
    queryPromise,  processPromise, getBuses, fetchSingleBus, getBusesUsers, InsertBus, destroyBus, updateBusQuery, checkBusNumber, checkBusPlateNumber, 
    checkUserId, tbname, getAllUsers, singleUser, dbQuery, updateDbQuery, deletDbUser, checkFullName, checkUsername, checkContactNo, checkEmailAddress,
    checkDriverName, checkDriverContact, fetchDrivers, fetchDriversUsers, getSingleDriver, InsertDriver, updateDriverQuery, destroyDriver
}

