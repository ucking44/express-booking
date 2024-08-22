////////////////  ROUTE FOR USER  //////////////////////////
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

module.exports = {
    getAllUsers, singleUser, dbQuery, updateDbQuery, deletDbUser, checkFullName,
    checkUsername, checkContactNo, checkEmailAddress, checkUserId
}

 