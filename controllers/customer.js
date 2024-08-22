const { queryPromise, processPromise } = require('../qpromise')

const bcrypt = require('bcrypt')
const { getAllCustomers, saveCustomer, checkUserId, checkCustomerEmail, fetchSingleCustomer, 
    updateCustomerQuery, deleteCustomerQuery } = require('../model/customer')


////// FETCH ALL CUSTOMERS
const getCustomers = async(req, res) =>
{
    try 
    {
        //// FETCH ALL CUSTOMERS FROM DB
        const result = await queryPromise(getAllCustomers)

        //if(result.length < 1)
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
                success: true,
                error: "No Customer Record Was Found"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Something Went Wrong With The Code..."
        })
    }
}

//////// CREATE CUSTOMER
const createCustomer = async(req, res) =>
{
    try 
    {
        //// GET DATA FROM REQUEST BODY
        const { user_id, customer_name, customer_contact, customer_email, username, password, account_status } = req.body
        ///// VALIDATE INCOMING REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!customer_name)
        {
            return res.status(400).json({
                success: false,
                message: 'Customer Name Field Can Not Be Empty...'
            })
        }
        if(!customer_email)
        {
            return res.status(400).json({
                success: false,
                message: 'Customer Email Field Can Not Be Empty...'
            })
        }

        ///// CHECK IF USER EXIST
        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }

        ////// CHECK IF EMAIL HAS BEEN TAKEN
        const dataCustomerEmail = await queryPromise(checkCustomerEmail, [customer_email])
        if(dataCustomerEmail[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Customer With The Email " + customer_email + " Already Exist..."
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const requestBody = [ user_id, customer_name, customer_contact, customer_email, username, hashPassword, account_status ]
        //// PROCESS AND PERSIST DATA TO DB
        const result = await processPromise(saveCustomer, requestBody)

        if (result)
        {
            res.status(201).json({
                success: true,
                message: "Customer Was Created Successfully!",
                data: {
                    user_id, customer_name, customer_contact, customer_email, username, password, account_status
                }
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: "Oooopssss! Customer Was Not Created"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Something Went Wrong With The Code..."
        })
    }
}

///////  GET SINGLE CUSTOMER
const getSingleCustomer = async(req, res) =>
{
    try 
    {
        //// GET REQUEST ID PARAM
        const { id } = req.params
        //// PROCESS AND FETCH SINGLE DATA FROM DB
        const result = await processPromise(fetchSingleCustomer, id)

        if (!result.length)
        {
            res.status(404).json({
                success: false,
                message: `Customer With The ID Of ${id} Does Not Exist`
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
            message: "Failed! Something Went Wrong With The Code..."
        })
    }
}

///////// UPDATE CUSTOMER
const updateCustomer = async(req, res) =>
{
    try 
    {
        //// GET REQUEST ID PARAM
        const { id } = req.params
        //// GET DATA FROM REQUEST BODY
        const { user_id, customer_name, customer_contact, customer_email, username, password, account_status } = req.body
        ///// VALIDATE INCOMING REQUEST DATA
        if(!user_id)
        {
            return res.status(400).json({
                success: false,
                message: 'User ID Field Can Not Be Empty...'
            })
        }
        if(!customer_name)
        {
            return res.status(400).json({
                success: false,
                message: 'Customer Name Field Can Not Be Empty...'
            })
        }
        if(!customer_email)
        {
            return res.status(400).json({
                success: false,
                message: 'Customer Email Field Can Not Be Empty...'
            })
        }

        ///// CHECK IF USER EXIST
        const dataUserId = await queryPromise(checkUserId, [user_id])
        if(dataUserId[0].count === 0)
        {
            return res.status(400).json({
                success: false,
                message: `Ooooopssss...User With The ID Of ${ user_id } Does Not Exist.....`
            })
        }

        ////// CHECK IF EMAIL HAS BEEN TAKEN
        // const dataCustomerEmail = await queryPromise(checkCustomerEmail, [customer_email])
        // if(dataCustomerEmail[0].count > 1 || dataCustomerEmail[0].count === 2)
        // {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Ooooopssss...Customer With The Email " + customer_email + " Already Exist..."
        //     })
        // }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const requestBody = [ user_id, customer_name, customer_contact, customer_email, username, hashPassword, account_status, id ]
        //// PROCESS AND PERSIST DATA TO DB
        const result = await processPromise(updateCustomerQuery, requestBody)

        if (result.affectedRows > 0)
        {
            res.status(200).json({
                success: true,
                message: "Customer Was Updated Successfully!",
                data: {
                    user_id, customer_name, customer_contact, customer_email, username, password, account_status
                }
            })
        }
        else
        {
            res.status(404).json({
                success: false,
                message: "Customer With The ID Of " + id + " Was Not Found"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Something Went Wrong With The Code..."
        })
    }
}

///// DELETE CUSTOMER
const deleteCustomer = async(req, res) =>
{
    try 
    {
        //// GET REQUEST ID PARAM
        const { id } = req.params
        ///// PROCESS AND DELETE DATA FROM DB
        const result = await processPromise(deleteCustomerQuery, [id])

        if (result.affectedRows === 0)
        {
            res.status(404).json({
                success: false,
                message: `Customer With The ID Of ${ id } Does Not Exist!`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "Customer Was Deleted Successfully!"
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed! Something Went Wrong With The Code..."
        })
    }
}

module.exports = {
    getCustomers,
    createCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer
}

