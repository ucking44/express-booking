const { queryPromise, processPromise } = require('../qpromise')

const { checkUserId, fetSchedules, getAllSchedules, fetchSingleSchedule, getSingleSch, checkBusId, 
    checkDriverId, insertSchedule, updateScheduleData, destroySchedule} = require('../model/schedule')

////////  FETCH ALL SCHEDULES  /////////////
const getSchedules = async(req, res) =>
{
    try 
    {
        //// PROCESS DATA AND FETCH ALL SCHEDULES
        const result = await queryPromise(getAllSchedules)

        if(result.length < 1)
        {
            res.status(404).json({
                success: false,
                message: `No Schedule Record Was Found`
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
            message: `Failed! Ooopssss! Something Went Wrong With The Code...`
        })
    }
}

/////////  GET A SINGLE SCHEDULE BY ID  //////
const getSingleSchedule = async(req, res) =>
{
    try 
    {
        /// GET THE ID PARAM FROM REQUEST
        const { id } = req.params

        //// PROCESS DATA AND FETCH SINDLE SCHEDULE
        const result = await processPromise(fetchSingleSchedule, [id])

        if(result.length === 0)
        {
            res.status(404).json({
                success: false,
                message: `Schedule With The ID Of ${id} Was Not Found`
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
            message: `Failed! Ooopssss! Something Went Wrong With The Code...`
        })
    }
}

///////////   CREATE SCHEDULE  //////////
const createSchedule = async(req, res) =>
{
    try 
    {
        /////  GET ALL REQUEST DATA FROM BODY
        const { 
            user_id, bus_id, driver_id, starting_point, destination, schedule_date, 
            departure_time, estimated_arrival_time, fare_amount, remarks 
        } = req.body
        ///// VALIDATE REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!bus_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Bus ID Field Can Not Be Empty...'
            })
        }
        if(!driver_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Driver ID Field Can Not Be Empty...'
            })
        }
        if(!destination)
        {
            return res.status(400).json({
                success: false,
                message: 'Destination Field Can Not Be Empty...'
            })
        }
        if(!fare_amount)
        {
            return res.status(400).json({
                success: false,
                message: 'Fare Amount Field Can Not Be Empty...'
            })
        }

        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }
        const dataBusId = await queryPromise(checkBusId, [bus_id])
        if(dataBusId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...Bus With The ID Of ${ bus_id } Does Not Exist.....`
            })
        }
        const dataDriverId = await queryPromise(checkDriverId, [driver_id])
        if(dataDriverId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...Driver With The ID Of ${ driver_id } Does Not Exist.....`
            })
        }
        ///////  PROCESS AND PERSIST DATA TO DB
        const dataSchedule = [ user_id, bus_id, driver_id, starting_point, destination, schedule_date, departure_time, estimated_arrival_time, fare_amount, remarks ]
        const result = await processPromise(insertSchedule, dataSchedule)

        if(result)
        {
            res.status(201).json({
                success: true,
                message: "Schedule Was Created Successfully!",
                data: {
                    user_id, bus_id, driver_id, starting_point, destination, 
                    schedule_date, departure_time, estimated_arrival_time, fare_amount, remarks
                }
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: "Failed! Schedule Was Not Created"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Ooopssss! Something Went Wrong With The Code...`
        })
    }
}

////////////  UPDATE SCHEDULE  /////////
const updateSchedule = async(req, res) =>
{
    try 
    {
        /// GET THE ID PARAM FROM REQUEST
        const { id } = req.params
        /////  GET ALL REQUEST DATA FROM BODY
        const { 
            user_id, bus_id, driver_id, starting_point, destination, schedule_date, 
            departure_time, estimated_arrival_time, fare_amount, remarks 
        } = req.body
        ///// VALIDATE REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!bus_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Bus ID Field Can Not Be Empty...'
            })
        }
        if(!driver_id)
        {
            return res.status(400).json({
                success: false,
                message: 'Driver ID Field Can Not Be Empty...'
            })
        }
        if(!destination)
        {
            return res.status(400).json({
                success: false,
                message: 'Destination Field Can Not Be Empty...'
            })
        }
        if(!fare_amount)
        {
            return res.status(400).json({
                success: false,
                message: 'Fare Amount Field Can Not Be Empty...'
            })
        }

        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }
        const dataBusId = await queryPromise(checkBusId, [bus_id])
        if(dataBusId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...Bus With The ID Of ${ bus_id } Does Not Exist.....`
            })
        }
        const dataDriverId = await queryPromise(checkDriverId, [driver_id])
        if(dataDriverId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...Driver With The ID Of ${ driver_id } Does Not Exist.....`
            })
        }
        ///////  PROCESS AND UPDATE DATA
        const dataSchedule = [ user_id, bus_id, driver_id, starting_point, destination, schedule_date, departure_time, estimated_arrival_time, fare_amount, remarks, id ]
        const result = await processPromise(updateScheduleData, dataSchedule)

        if(result.affectedRows > 0)
        {
            res.status(200).json({
                success: true,
                message: "Schedule Was Updated Successfully!",
                data: {
                    user_id, bus_id, driver_id, starting_point, destination, 
                    schedule_date, departure_time, estimated_arrival_time, fare_amount, remarks
                }
            })
        }
        else
        {
            res.status(404).json({
                success: false,
                message: `Schedule With The ID Of ${id} Was Not Found`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Ooopssss! Something Went Wrong With The Code...`
        })
    }
}

///////////  DELETE SCHEDULE  //////////
const deleteSchedule = async(req, res) =>
{
    try 
    {
        //////// GET THE ID PARAM FROM REQUEST
        const { id } = req.params
        ///// PROCESS AND DELETE DATA FROM DB
        const result = await processPromise(destroySchedule, id)

        if (result.affectedRows === 0)
        {
            res.status(404).json({
                success: false,
                message: `Schedule With The ID Of ${id} Does Not Exist`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: `Schedule With The ID Of ${id} Was Deleted Successfully!`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Oooooopsss! Something Went Wrong With The Code..."
        })
    }
}

module.exports = {
    getSchedules,
    getSingleSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule
}

