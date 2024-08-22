const { db } = require('./db')

function queryPromise(sql, values = [])
{
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(results)
            }
        })
    })
}

function processPromise(sql, values = []) 
{
    const goodPromise = new Promise((resolve, reject) => 
    {
        db.query(sql, values, (error, results) => {
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(results)
            }
        })
    })

    return goodPromise
}

module.exports = {
    queryPromise,
    processPromise
}
