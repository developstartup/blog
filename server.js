const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const product_route = require('./api/routes/products');
const order_route = require('./api/routes/order');


// const mongoDB_URL = "mongodb+srv://kim:123123123@cluster0-37bhl.mongodb.net/test?retryWrites=true&w=majority";
const mongoDB_URL = "mongodb://teddykwak:k9915402@ds141294.mlab.com:41294/node-rest-shop";

// Database connect
mongoose.connect(mongoDB_URL, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));



app.use('/product', product_route);
app.use('/order', order_route);


const PORT = 3000;

app.listen(PORT, console.log("server started"));
