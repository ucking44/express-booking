const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const user = require('./routes/user')
const bus = require('./routes/bus')
const driver = require('./routes/driver')
const schedule = require('./routes/schedule')
const customer = require('./routes/customer')
const booking = require('./routes/booking')
const payment = require('./routes/payment')


const port = 7000;

app.use(bodyParser.json());
////  PARSE FORM DATA
app.use(bodyParser.urlencoded({ extended: true }))

// PARSE JSON
//app.use(express.json())

/// CONFIGURE ROUTE USES
app.use('/user', user)
app.use('/bus', bus)
app.use('/driver', driver)
app.use('/schedule', schedule)
app.use('/customer', customer)
app.use('/booking', booking)
app.use('/payment', payment)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


