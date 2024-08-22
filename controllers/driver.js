const { queryPromise, processPromise } = require('../qpromise')

const { checkUserId, checkDriverName, checkDriverContact, fetchDrivers, fetchDriversUsers, 
    getSingleDriver, InsertDriver, updateDriverQuery, destroyDriver } = require('../model/driver')

///// FETCH ALL DRIVERS
const getAllDrivers = async(req, res) =>
{
    try 
    {
        /////  GET AND PROCESS ALL DATA
        const result = await queryPromise(fetchDriversUsers)

        if(result.length < 1)
        {
            res.status(404).json({
                success: false,
                message: `No Driver Record Was Found!`
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
            message: `Failed! Something Went Wrong With The Code...`
        })
    }
}

////// FETCH SINGLE DRIVER DATA
const singleDriver = async(req, res) =>
{
    try 
    {
        /// GET DATA ID PARAM
        const { id } = req.params
        //// PROCESS AND FETCH DATA BY ID
        const result = await queryPromise(getSingleDriver, id)

        if(result.length === 0)
        {
            res.status(404).json({
                success: false,
                message: `Driver With The ID Of ${id} Does Not Exist`
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
            message: `Failed! Something Went Wrong With The Code...`
        })
    }
}

/////  CREATE AND SAVE DRIVER TO DB
const createDriver = async(req, res) =>
{
    try 
    {
        //// GET ALL THE BODY REQUEST PARAMS
        const { user_id, driver_name, driver_contact } = req.body
        
        ///// VALIDATE REQUEST BODY
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!driver_name)
        {
            return res.status(400).json({
                success: false,
                message: 'Driver Name Field Can Not Be Empty...'
            })
        }
        if(!driver_contact)
        {
            return res.status(400).json({
                success: false,
                message: 'Driver Contact Field Can Not Be Empty...'
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

        const dataDriverName = await queryPromise(checkDriverName, [driver_name])
        if(dataDriverName[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Driver With The Name " + driver_name + " Already Exist..."
            })
        }

        //// PROCESS AND PERSIST DATA TO DB
        const driverBody = [ user_id, driver_name, driver_contact ]
        const result = await processPromise(InsertDriver, driverBody)

        if (result)
        {
            res.status(201).json({
                success: true,
                message:'Driver Was Created Successfully!',
                data: { user_id, driver_name, driver_contact }
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: "Ooooopss! Driver Was Not Created"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Went Wrong With The Code...`
        })
    }
}

///// UPDATE DRIVER
const updateDriver = async(req, res) =>
{
    try 
    {
        ///  GET ID PARAM FROM REQUEST
        const id = req.params.id

        //// GET ALL THE BODY REQUEST PARAMS
        const { user_id, driver_name, driver_contact } = req.body
        
        ///// VALIDATE REQUEST BODY
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!driver_name)
        {
            return res.status(400).json({
                success: false,
                message: 'Driver Name Field Can Not Be Empty...'
            })
        }
        if(!driver_contact)
        {
            return res.status(400).json({
                success: false,
                message: 'Driver Contact Field Can Not Be Empty...'
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

        const dataDriverName = await queryPromise(checkDriverName, [driver_name])
        if(dataDriverName[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Driver With The Name " + driver_name + " Already Exist....."
            })
        }

        //// PROCESS AND PERSIST DATA TO DB
        const driverBody = [ user_id, driver_name, driver_contact, id ]
        const result = await processPromise(updateDriverQuery, driverBody)

        if (result.affectedRows === 0)
        {
            return res.status(404).json({
                success: false,
                message: `FAILED! Driver WITH THE ID OF ${id} WAS NOT FOUND`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "Driver Was Updated Successfully!",
                data: { user_id, driver_name, driver_contact }
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Went Wrong With The Code...`
        })
    }
}

/////  DELETE QUERY FOR DRIVER
const deleteDriver = async(req, res) =>
{
    try 
    {
        //// GET ID FROM REQUEST PARAM
        const { id } = req.params
        /// PROCESS AND DELETE DATA FROM DB
        const result = await processPromise(destroyDriver, id)

        if(result.affectedRows < 1)
        {
            res.status(404).json({
                success: false,
                message: `FAILED! Driver WITH THE ID OF ${id} WAS NOT FOUND`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: `DRIVER WITH THE ID OF ${id} WAS DELETED SUCCESSFULLY`,
                //data: result
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Went Wrong With The Code...`
        })
    }
}

module.exports = {
    getAllDrivers,
    singleDriver,
    createDriver,
    updateDriver,
    deleteDriver
}

