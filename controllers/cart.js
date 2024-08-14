const { queryPromise, processPromise } = require('../db')

const getCartProduct = 'SELECT cart.*, products.name, products.price FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?'
const insertProduct = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)'
const cartUpdate = 'UPDATE cart SET quantity = ? WHERE id = ?'
const destroyCart = 'DELETE FROM cart WHERE id=?'

//////  GET ALL CART ITEM BY USER ID

const getCartItem = async(req, res) =>
{
    try 
    {
        const { user_id } = req.params
        const SQL = getCartProduct
        const result = await processPromise(SQL, user_id)

        if (result.length < 1)
        {
            res.status(404).json({
                success: true,
                error: "No Item Was Found In Cart"
            })
        }
        else
        {
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
            message: `Failed! Oooopssss Something Went Wrong`
        })
    }
}

const createCart = async(req, res) =>
{
    try 
    {
        /// COLLECT ALL DATA THAT COMES FROM REQUEST BODY
        const { user_id, product_id, quantity } = req.body

        /// VALIDATE REQUEST DATA FROM BODY
        if (!quantity )
        {
            return res.status(400).json({
                success: false,
                message: "QUANTITY FIELD IS REQUIRED"
            })
        }
        else
        {
            const cartData = [ user_id, product_id, quantity ]
            const SQL = insertProduct
            const result = await queryPromise(SQL, cartData)

            if (result)
            {
                res.status(201).json({
                    success: true,
                    message: "Item Was Added To Cart Successfully",
                    data: 
                    {
                        user_id: user_id,
                        product_id: product_id,
                        quantity: quantity
                    }
                })
            }
            else
            {
                res.status(400).json({
                    success: false,
                    message: `Failed! Item Was Not Added To Cart`
                })
            }
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Ooooooopssss Something Went Wrong...`
        })
    }
}

const updateCart = async(req, res) =>
{
    try 
    {
        ////// GET ID PARAMETER
        const { id } = req.params
        /// COLLECT ALL DATA THAT COMES FROM REQUEST BODY
        const { user_id, product_id, quantity } = req.body
        
        /// VALIDATE REQUEST DATA FROM BODY
        if (!quantity )
        {
            return res.status(400).json({
                success: false,
                message: "QUANTITY FIELD IS REQUIRED"
            })
        }
        else
        {
            // BUILDING THE QUERY
            const updateData = [ user_id, product_id, quantity, id ]
            //const SQL = 'UPDATE cart SET quantity = ? WHERE id = ?'
            const SQL = cartUpdate
            /// EXECUTING THE QUERY
            const result = await queryPromise(SQL, updateData)

            //if(result.affectedRows === 0)
            if(result.affectedRows < 1)
            {
                return res.status(404).json({
                    success: false,
                    message: `CART WITH THE ID OF ${id} NOT FOUND`
                })
            }
            else
            {
                res.status(200).json({
                    success: true,
                    message: `Cart Was Updated Successfully`,
                    user_id,
                    product_id,
                    quantity
                })
            }
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Went Wrong With The Foreign Key`
        })
    }
}

const deleteCart = async(req, res) =>
{
    try 
    {
        //// GET ID PARAMS
        const { id } = req.params
        /// EXECUTING THE QUERY
        const SQL = destroyCart

        const deleteQuery = await processPromise(SQL, [id])

        ///  VALIDATION => CHECK IF DATA IS EMPTY
        if (deleteQuery.affectedRows === 0)
        {
            return res.status(404).json({
                success: false,
                message: `CART WITH THE ID OF ${id} NOT FOUND`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                message: `CART WITH THE ID OF ${id} WAS DELETED SUCCESSFULLY`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Failed! Something Went Wrong........`
        })
    }
}

module.exports = {
    getCartItem,
    createCart,
    updateCart,
    deleteCart
}

