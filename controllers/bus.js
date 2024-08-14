const { queryPromise, processPromise, getBuses, fetchSingleBus, getBusesUsers, InsertBus, 
    destroyBus, updateBusQuery, checkBusNumber, checkBusPlateNumber, checkUserId
 } = require('../db')


//// FETCH ALL BUSES
const getAllBuses = async(req, res) =>
{
    try 
    {
        /// FETCH ALL DATA FROM DB
        const result = await processPromise(getBusesUsers)
        if(result.length < 1)
        //if (result)
        {
            res.status(404).json({
                success: false,
                message: "No Bus Record Was Found!"
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
            message: "Failed! Something Went Wrong With The Code...",
            error
        })
    }
}

//// FETCH BUS BY ID
const getSingleBus = async(req, res) =>
{
    try 
    {
        /// GET THE REQUEST ID PARAMS
        const { id } = req.params
        //// FETCH SINGLE DATA FROM DB
        const result = await queryPromise(fetchSingleBus, [id])

        if(result.length === 0)
        {
            res.status(404).json({
                success: false,
                message: `BUS WITH THE ID OF ${id} WAS NOT FOUND`
            })
        }
        else
        {
            //res.status(200).json(result[0])
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
            message: "Failed! Something Went Wrong With The Code...",
            error
        })
    }
}

////// CREATE BUS
const createBus = async(req, res) =>
{
    try 
    {
        //// GET REQUEST DATA FROM BODY
        const { user_id, bus_number, bus_plate_number, bus_type, capacity } = req.body

        ////// VALIDATE DATA BEFORE PROCESSING
        if (user_id === "" || user_id === null)
        {
            return res.status(400).json({
                success: false,
                message: "User ID Field Can Not Be Empty!"
            })
        }
        if (bus_number === "" || bus_number === null)
        {
            return res.status(400).json({
                success: false,
                message: "Bus Number Field Can Not Be Empty!"
            })
        }
        if (bus_plate_number === "" || bus_plate_number === null)
        {
            return res.status(400).json({
                success: false,
                message: "Bus Plate Number Field Can Not Be Empty!"
            })
        }
        if (!capacity)
        {
            return res.status(400).json({
                success: false,
                message: "Capacity Field Can Not Be Empty!"
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

        const dataBusNumber = await queryPromise(checkBusNumber, [bus_number])
        if(dataBusNumber[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Bus Number Already Exist....."
            })
        }

        const dataBusPlateNumber = await queryPromise(checkBusPlateNumber, [bus_plate_number])
        if(dataBusPlateNumber[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Bus Plate Number Already Exist....."
            })
        }

        const requestBody = [ user_id, bus_number, bus_plate_number, bus_type, Number(capacity) ]
        ///// PROCESS AND PERSIST DATA INTO DB
        const result = await processPromise(InsertBus, requestBody)

        if (result)
        {
            res.status(201).json({
                success: true,
                message: "Bus Was Saved Successfully!",
                data: { user_id, bus_number, bus_plate_number, bus_type, capacity }
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: `Oooooopssss! Bus Was NOT Saved`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Wrong With The Code...`,
            error
        })
    }
}

////// UPDATE BUS
const updateBus = async(req, res) =>
{
    try 
    {
        /// GET THE REQUEST ID PARAM
        const { id } = req.params
        ////// GET THE REQUEST BODY DATA
        const { user_id, bus_number, bus_plate_number, bus_type, capacity } = req.body

        ////// VALIDATE DATA BEFORE PROCESSING
        if (!user_id)
        {
            return res.status(400).json({
                success: false,
                message: "User ID Field Can Not Be Empty!"
            })
        }
        if (!bus_number)
        {
            return res.status(400).json({
                success: false,
                message: "Bus Number Field Can Not Be Empty!"
            })
        }
        if (!bus_plate_number)
        {
            return res.status(400).json({
                success: false,
                message: "Bus Plate Number Field Can Not Be Empty!"
            })
        }
        if (!capacity)
        {
            return res.status(400).json({
                success: false,
                message: "Capacity Field Can Not Be Empty!"
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

        const dataBusNumber = await queryPromise(checkBusNumber, [bus_number])
        if(dataBusNumber[0].count > 1)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Bus Number Already Exist....."
            })
        }

        const dataBusPlateNumber = await queryPromise(checkBusPlateNumber, [bus_plate_number])
        if(dataBusPlateNumber[0].count > 1)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Bus Plate Number Already Exist....."
            })
        }

        const updateBody = [ user_id, bus_number, bus_plate_number, bus_type, capacity, id ]

        //////// PROCESS AND PERSIST DATA TO DB
        const result = await queryPromise(updateBusQuery, updateBody)

        if (result.affectedRows < 1)
        //if (result.affectedRows === 0)
        {
            return res.status(404).json({
                success: false,
                message: `FAILED! BUS WITH THE ID OF ${id} WAS NOT FOUND`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "Bus Was Updated Successfully!",
                data: { user_id, bus_number, bus_plate_number, bus_type, capacity }
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Wrong With The Code...`,
            error
        })
    }
}

const deleteBus = async(req, res) =>
{
    try 
    {
        /// GET ID PARAM
        const { id } = req.params
        //// DELETE BUS DATA FROM DB
        const result = await processPromise(destroyBus, [id])

        ///  VALIDATION => CHECK IF DATA IS EMPTY
    
        if (result.affectedRows === 0)
        {
            return res.status(404).json({
                success: false,
                message: "BUS WITH THE ID OF " + $id + " NOT FOUND "
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: `BUS WITH THE ID OF ${id} WAS DELETED SUCCESSFULLY`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Wrong With The Code...`,
            error
        })
    }
}

module.exports = {
    createBus,
    getAllBuses,
    getSingleBus,
    updateBus,
    deleteBus
}
