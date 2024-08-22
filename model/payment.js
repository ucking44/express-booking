///////////////////////  ROUTE FOR PAYMENT  /////////////////////////
const getPaymentsQuery = `SELECT * FROM payments`
const checkUserId = `SELECT COUNT(*) AS count FROM users WHERE id = ?`
const checkBookingId = `SELECT COUNT(*) AS count FROM bookings WHERE id = ?`
const insertPayment = `INSERT INTO payments (user_id, booking_id, amount_paid, payment_date) VALUES (?, ?, ?, ?)`
const updatePaymentQuery = "UPDATE payments SET user_id = ?, booking_id = ?, amount_paid = ?, payment_date = ? WHERE id = ?"
const singlePaymentQuery = 'SELECT * FROM payments WHERE id = ?'
const deletePaymentQuery = "DELETE FROM payments WHERE id = ?"


module.exports = {
    getPaymentsQuery,
    checkUserId,
    checkBookingId,
    insertPayment,
    updatePaymentQuery,
    singlePaymentQuery,
    deletePaymentQuery
}

