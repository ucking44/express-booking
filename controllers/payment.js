const { queryPromise, processPromise } = require('../qpromise')

const { getPaymentsQuery, checkUserId, checkBookingId, insertPayment, updatePaymentQuery, 
    singlePaymentQuery, deletePaymentQuery } = require('../model/payment')

/////////  FETCH ALL PAYMENTS
const getAllPayments = async(req, res) =>
{
    try 
    {
        ///  PROCESS AND FETCH ALL PAYMENTS FROM DB
        const result = await queryPromise(getPaymentsQuery)

        if(result.length > 0)
        {
            res.status(200).json({
                success: true,
                data: result
            })
        }
        else
        {
            res.status(200).json({
                success: false,
                message: "No Payment Record Was Found!"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed! Ooooopsss! Something Went Wrong With The Code...'
        })
    }
}

//////  CREATE PAYMENT
const createPayment = async(req, res) =>
{
    try 
    {
        ///// GET THE REQUEST BODY
        const { user_id, booking_id, amount_paid, payment_date } = req.body
        ///// VALIDATE INCOMING REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!booking_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Booking ID Field Can Not Be Empty...'
            })
        }

        ///// CHECK IF USER ID EXIST
        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }

        ///// CHECK IF BOOKING ID EXIST
        const dataBookingId = await queryPromise(checkBookingId, [booking_id])
        if(dataBookingId[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...Booking With The ID Of ${ booking_id } Does Not Exist.....`
            })
        }
        ///// PROCESS AND PERSIST DATA TO DB
        const paymentParams = [ user_id, booking_id, amount_paid, payment_date ]
        const result = await processPromise(insertPayment, paymentParams)

        if (result)
        {
            res.status(201).json({
                success: true,
                message: "Payment Was Saved Successfully!",
                data: { user_id, booking_id, amount_paid, payment_date }
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: 'Payment Was Not Saved...'
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed! Ooooopsss! Something Went Wrong With The Code...'
        })
    }
}

//////  UPDATE PAYMENT
const updatePayment = async(req, res) =>
{
    try 
    {
        ///// GET REQUEST ID PARAM
        const { id } = req.params
        ///// GET THE REQUEST BODY
        const { user_id, booking_id, amount_paid, payment_date } = req.body
        ///// VALIDATE INCOMING REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!booking_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Booking ID Field Can Not Be Empty...'
            })
        }

        ///// CHECK IF USER ID EXIST
        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }

        ///// CHECK IF BOOKING ID EXIST
        const dataBookingId = await queryPromise(checkBookingId, [booking_id])
        if(dataBookingId[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...Booking With The ID Of ${ booking_id } Does Not Exist.....`
            })
        }
        ///// PROCESS AND PERSIST DATA TO DB
        const paymentParams = [ user_id, booking_id, amount_paid, payment_date, id ]
        const result = await processPromise(updatePaymentQuery, paymentParams)

        if (result.affectedRows > 0)
        {
            res.status(201).json({
                success: true,
                message: "Payment Was Updated Successfully!",
                data: { user_id, booking_id, amount_paid, payment_date }
            })
        }
        else
        {
            res.status(404).json({
                success: false,
                message: 'Payment With The ID Of ' + id + ' Does Not Exist...'
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed! Ooooopsss! Something Went Wrong With The Code...'
        })
    }
}

///// GET SINGLE PAYMENT
const getSinglePayment = async(req, res) =>
{
    try 
    {
        ////////// GET REQUEST ID PARAM
        const { id } = req.params
        //////  PROCESS AND FETCH SINGLE PAYMENT FROM DB
        const result = await processPromise(singlePaymentQuery, id)

        if (result.length > 0)
        {
            res.status(200).json({
                success: true,
                data: result
            })
        }
        else
        {
            res.status(404).json({
                success: false,
                message: `Payment With The ID Of ${ id } Was Not Found`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed! Ooooopsss! Something Went Wrong With The Code...'
        })
    }
}

///// DELETE PAYMENT
const deletePayment = async(req, res) =>
{
    try 
    {
        ////////// GET REQUEST ID PARAM
        const { id } = req.params
        /////// PROCESS AND DELETE PAYMENT DATA FROM DB
        const result = await processPromise(deletePaymentQuery, id)

        if(result.affectedRows === 0)
        {
            res.status(404).json({
                success: false,
                message: `Payment With The ID Of ${ id } Does Not Exist!`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "Payment Was Deleted Successfully!"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed! Ooooopsss! Something Went Wrong With The Code...'
        })
    }
}

module.exports = {
    getAllPayments,
    createPayment,
    updatePayment,
    getSinglePayment,
    deletePayment
}

