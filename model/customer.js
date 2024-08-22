///////////////////////  ROUTE FOR CUSTOMER  /////////////////////////
const getAllCustomers = `SELECT * FROM customers`
const saveCustomer = `INSERT INTO customers (user_id, customer_name, customer_contact, customer_email, username, password, account_status) VALUES (?, ?, ?, ?, ?, ?, ?)`
const checkUserId = `SELECT COUNT(*) AS count FROM users WHERE id = ?`
const checkCustomerEmail = `SELECT COUNT(*) AS count FROM customers WHERE customer_email = ?`
const fetchSingleCustomer = 'SELECT * FROM customers WHERE id = ?'
const updateCustomerQuery = "UPDATE customers SET user_id = ?, customer_name = ?, customer_contact = ?, customer_email = ?, username = ?, password = ?, account_status = ? WHERE id = ?"
const deleteCustomerQuery = `DELETE FROM customers WHERE id = ?`

module.exports = {
    getAllCustomers,
    saveCustomer,
    checkUserId,
    checkCustomerEmail,
    fetchSingleCustomer,
    updateCustomerQuery,
    deleteCustomerQuery
}

