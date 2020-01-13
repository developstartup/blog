const express = require('express');
const app = express();

const product_route = require('./api/routes/products');
const order_route = require('./api/routes/order');

app.use('/product', product_route);
app.use('/order', order_route);


const PORT = 3000;

app.listen(PORT, console.log("server started"));
