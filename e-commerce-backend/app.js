const express = require('express');
const mongoose = require('mongoose');
const authRiutes = require('./routes/auth.js');
const userRiutes = require('./routes/user.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routes/category.js')
const productRouter = require('./routes/product.js')
const orderRouter = require('./routes/order.js')
const braintreeRouter = require('./routes/braintree.js')
const cors = require("cors")
require('dotenv').config();


const app = express();
app.use(cors())
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

app.use('/api', authRiutes);
app.use('/api', userRiutes);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', braintreeRouter);



//db connection
const dburl = process.env.MONGO_URL;
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected!');
}).catch(err => {
    console.log(err);
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('server is runnong yup!')
});