const { queryPromise, processPromise } = require('../qpromise')

const { fetchBookings, checkUserId, checkScheduleID, checkCustomeID, insertBooking, 
    singleBooking, updateBookingQuery, deleteBookingQuery } = require('../model/booking')

////// GET ALL BOOKINGS
const getAllBookings = async(req, res) =>
{
    try 
    {
        //// FETCH ALL BOOKINGS FROM DB
        const result = await queryPromise(fetchBookings)

        if(result.length < 1)
        //if(!result)
        {
            return res.status(200).json({
                success: true,
                message: "No Booking Record Was Found..."
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                data: result
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Oooopssss! Something Went Wrong With The Code..."
        })
    }
}

////// CREATE BOOKING
const createBooking = async(req, res) =>
{
    try 
    {
        ///// GET REQUEST BODY DATA
        const { user_id, schedule_id, customer_id, number_of_seats, fare_amount, total_amount, date_of_booking, booking_status } = req.body
        ///// VALIDATE INCOMING REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!schedule_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Schedule ID Field Can Not Be Empty...'
            })
        }
        if(!customer_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Customer ID Field Can Not Be Empty...'
            })
        }

        ///// CHECK IF USER EXIST
        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }

        ///// CHECK IF SCHEDULE EXIST
        const dataScheduleID = await queryPromise(checkScheduleID, [schedule_id])
        if(dataScheduleID[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...Schedule With The ID Of ${ schedule_id } Does Not Exist.....`
            })
        }

        ///// CHECK IF CUSTOMER EXIST
        const dataCustomerID = await queryPromise(checkCustomeID, [customer_id])
        if(dataCustomerID[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...Customer With The ID Of ${ customer_id } Does Not Exist.....`
            })
        }

        const queryBooking = [ user_id, schedule_id, customer_id, number_of_seats, fare_amount, total_amount, date_of_booking, booking_status ]
        ///// PROCESS AND PERSIST DATA TO DB
        const result = await processPromise(insertBooking, queryBooking)

        if(result)
        {
            res.status(201).json({
                success: true,
                message: "Booking Was Created Successfully!",
                data: {
                    user_id, schedule_id, customer_id, number_of_seats, fare_amount, total_amount, date_of_booking, booking_status
                }
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: "Ooooopsss! Booking Was Not Created"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Oooopssss! Something Went Wrong With The Code..."
        })
    }
}

///// GET SINGLE BOOKING
const getSingleBooking = async(req, res) =>
{
    try 
    {
        ////  GET ID FROM REQUEST PARAM
        const { id } = req.params
        ///// PROCESS AND FETCH SINGLE DATA
        const result = await queryPromise(singleBooking, [id])
        
        if(result.length > 0)
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
                message: `Booking With The ID Of ${id} Does Not Exist`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Oooopssss! Something Went Wrong With The Code..."
        })
    }
}

////// UPDATE BOOKING
const updateBooking = async(req, res) =>
{
    try 
    {
        ////  GET ID FROM REQUEST PARAM
        const { id } = req.params
        ///// GET REQUEST BODY DATA
        const { user_id, schedule_id, customer_id, number_of_seats, fare_amount, total_amount, date_of_booking, booking_status } = req.body
        ///// VALIDATE INCOMING REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!schedule_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Schedule ID Field Can Not Be Empty...'
            })
        }
        if(!customer_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Customer ID Field Can Not Be Empty...'
            })
        }

        ///// CHECK IF USER EXIST
        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }

        ///// CHECK IF SCHEDULE EXIST
        const dataScheduleID = await queryPromise(checkScheduleID, [schedule_id])
        if(dataScheduleID[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...Schedule With The ID Of ${ schedule_id } Does Not Exist.....`
            })
        }

        ///// CHECK IF CUSTOMER EXIST
        const dataCustomerID = await queryPromise(checkCustomeID, [customer_id])
        if(dataCustomerID[0].count === 0)
        {
            return res.status(404).json({
                success: false,
                message: `Ooooopssss...Customer With The ID Of ${ customer_id } Does Not Exist.....`
            })
        }

        const queryBooking = [ user_id, schedule_id, customer_id, number_of_seats, fare_amount, total_amount, date_of_booking, booking_status, id ]
        ///// PROCESS AND PERSIST DATA TO DB
        const result = await processPromise(updateBookingQuery, queryBooking)

        if(result.affectedRows > 0)
        {
            res.status(200).json({
                success: true,
                message: "Booking Was Updated Successfully!",
                data: {
                    user_id, schedule_id, customer_id, number_of_seats, fare_amount, total_amount, date_of_booking, booking_status
                }
            })
        }
        else
        {
            res.status(404).json({
                success: false,
                message: `Ooooopssss...Booking With The ID Of ${ id } Does Not Exist.....`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Oooopssss! Something Went Wrong With The Code..."
        })
    }
}

////// DELETE BOOKING
const deleteBooking = async(req, res) =>
{
    try 
    {
        ////  GET ID FROM REQUEST PARAM
        const { id } = req.params
        ///// PROCESS AND DELETE SINGLE DATA FROM DB
        const result = await queryPromise(deleteBookingQuery, id)

        if (result.affectedRows === 0)
        {
            res.status(404).json({
                success: false,
                message: `Booking With The ID Of ${ id } Does Not Exist!`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "Booking Was Deleted Successfully!"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Oooopssss! Something Went Wrong With The Code..."
        })
    }
}


module.exports = {
    getAllBookings,
    createBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking
}

