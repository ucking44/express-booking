const { queryPromise, processPromise, tbname, getAllUsers, singleUser, dbQuery, updateDbQuery, 
    deletDbUser, checkFullName, checkUsername, checkContactNo, checkEmailAddress } = require('../db')

////// FETCH ALL USERS
const getUsers = async(req, res) =>
{
    try 
    {
        const result = await processPromise(getAllUsers)
        if (result)
        {
            res.status(200).json({
                success: true,
                result: result
            })
        }
        else if(result.length < 1)
        {
            res.status(404).json({
                success: true,
                error: "No Record Was Found"
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: "Bad Request, Please Try Again..."
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Something Went Wrong, Check Your Code...`,
            error: error
        })
    }
}

///// FETCH A SINGLE USER BY ID
const getSingleUser = async(req, res) =>
{
    try 
    {
        //// GET THE ID FROM THE REQUEST PARAMS
        const { id } = req.params
        const result = await queryPromise(singleUser, id)
        ///  VALIDATION => CHECK IF DATA IS EMPTY OR DOES NOT EXIST
        if(result.length === 0)
        {
            res.status(404).json({
                success: false,
                message: `USER WITH THE ID OF ${id} NOT FOUND`
            })
        }
        else
        {
            //res.status(200).json(result[0])
            res.status(200).json({
                success: true,
                result: result
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Went Wrong, Check Your Code...`,
            error
        })
    }
}

//// CREATE A NEW USER
const createUser = async(req, res) =>
{
    try 
    {
        ///// GET ALL REQUEST BODY DATA
        const { full_name, contact_no, username, account_category, account_status, email_address, userpassword } = req.body

        ////// VALIDATE DATA BEFORE PROCESSING
        if (full_name === "" || full_name === null)
        {
            return res.status(400).json({
                success: false,
                message: "Name Field Can Not Be Empty!"
            })
        }
        if (contact_no === "" || contact_no === null)
        {
            return res.status(400).json({
                success: false,
                message: "Contact Number Field Can Not Be Empty!"
            })
        }
        if (username === "" || username === null)
        {
            return res.status(400).json({
                success: false,
                message: "Username Field Can Not Be Empty!"
            })
        }
        if (email_address === "" || email_address === null)
        {
            return res.status(400).json({
                success: false,
                message: "Email Address Field Can Not Be Empty!"
            })
        }

        const dataFullName = await queryPromise(checkFullName, [full_name])
        if(dataFullName[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Name Already Exist....."
            })
        }
        const datacontactNo = await queryPromise(checkContactNo, [contact_no])
        if(datacontactNo[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Contact Number Already Exist....."
            })
        }
        const dataUsername = await queryPromise(checkUsername, [username])
        //const countUsername = dataUsername[0].count
        if(dataUsername[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Username Already Exist....."
            })
        }
        const dataEmailAddress = await queryPromise(checkEmailAddress, [email_address])
        if(dataEmailAddress[0].count > 0)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Email Address Already Exist....."
            })
        }

        const queryBody = [ full_name, contact_no, username, account_category, account_status, email_address, userpassword ]
        ////  PROCESS ALL QUERIES
        const result = await processPromise(dbQuery, queryBody)
        
        if(result)
        {
            res.status(201).json({
                success: true,
                message: "User Was Created Successfully!",
                data: {
                    full_name: full_name,
                    contact_no: contact_no,
                    username: username,
                    account_category: account_category,
                    account_status: account_status,
                    email_address: email_address,
                    userpassword: userpassword
                }
            })
        }
        else
        {
            res.status(400).json({
                success: false,
                message: `User Was Not Created...`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Ooooopsss Something Went Wrong`,
            error
        })
    }
}

////// UPDATE USER BY ID
const updateUser = async(req, res) =>
{
    try 
    {
        ////   GET THE ID FROM THE REQUEST PARAMS
        const { id } = req.params
        //// GET ALL REQUEST DATA FROM BODY
        const { full_name, contact_no, username, account_category, account_status, email_address, userpassword } = req.body

        ////// VALIDATE DATA BEFORE PROCESSING
        if (full_name === "" || full_name === null)
        {
            return res.status(400).json({
                success: false,
                message: "Name Field Can Not Be Empty!"
            })
        }
        if (contact_no === "" || contact_no === null)
        {
            return res.status(400).json({
                success: false,
                message: "Contact Number Field Can Not Be Empty!"
            })
        }
        if (username === "" || username === null)
        {
            return res.status(400).json({
                success: false,
                message: "Username Field Can Not Be Empty!"
            })
        }
        if (email_address === "" || email_address === null)
        {
            return res.status(400).json({
                success: false,
                message: "Email Address Field Can Not Be Empty!"
            })
        }

        const dataFullName = await queryPromise(checkFullName, [full_name])
        if(dataFullName[0].count > 1)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Name Already Exist....."
            })
        }
        const datacontactNo = await queryPromise(checkContactNo, [contact_no])
        if(datacontactNo[0].count > 1)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Contact Number Already Exist....."
            })
        }
        const dataUsername = await queryPromise(checkUsername, [username])
        //const countUsername = dataUsername[0].count
        if(dataUsername[0].count > 1)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Username Already Exist....."
            })
        }
        const dataEmailAddress = await queryPromise(checkEmailAddress, [email_address])
        if(dataEmailAddress[0].count > 1)
        {
            return res.status(400).json({
                success: false,
                message: "Ooooopssss...Email Address Already Exist....."
            })
        }

        const requestBody = [ full_name, contact_no, username, account_category, account_status, email_address, userpassword, id ]
        ///// PROCESS AND PERSIST DATA
        const result = await processPromise(updateDbQuery, requestBody)

        //if (result.affectedRows < 1)
        if (result.affectedRows === 0)
        {
            return res.status(404).json({
                success: false,
                message: `FAILED! USER WITH THE ID OF ${id} WAS NOT FOUND`
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "User Was Updated Successfully!",
                data: {
                    full_name: full_name,
                    contact_no: contact_no,
                    username: username,
                    account_category: account_category,
                    account_status: account_status,
                    email_address: email_address,
                    userpassword: userpassword
                }
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Ooooopsss Something Went Wrong`,
            error
        })
    }
}

///// DELETE USER BY ID
const deleteUser = async(request, response) =>
{
    try 
    {
        /// GET THE ID FROM REQUEST PARAM
        const { id } = request.params
        //// DELETE USER FROM DB
        const deleteIdUser = await queryPromise(deletDbUser, id)
        ///  VALIDATION => CHECK IF DATA IS EMPTY
        
        if (deleteIdUser.affectedRows < 1)
        {
            return response.status(404).json({
                success: false,
                message: `USER WITH THE ID OF ${id} NOT FOUND`
            })
        }
        else
        {
            return response.status(200).json({
                success: true,
                message: `USER WITH THE ID OF ${id} WAS DELETED SUCCESSFULLY`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        response.status(500).json({
            success: false,
            message: `Failed! Ooooopsss Something Went Wrong`,
            error
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}

