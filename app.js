const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const cart = require('./routes/cart')
const user = require('./routes/user')
const bus = require('./routes/bus')
const driver = require('./routes/driver')


const port = 7000;

app.use(bodyParser.json());
////  PARSE FORM DATA
app.use(bodyParser.urlencoded({ extended: true }))

// PARSE JSON
//app.use(express.json())

/// CONFIGURE ROUTE USES
app.use('/cart', cart)
app.use('/user', user)
app.use('/bus', bus)
app.use('/driver', driver)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


