const express = require('express');
const router = express.Router();


const orderModel = require("../models/order");
const productModel = require("../models/product");

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "order success"
    });
});

router.post("/", (req, res) => {

    productModel
        .findById(req.body.product._id)
        .then(productdata => {
            if(!productdata) {
                return res.status(404).json({
                    msg: "product not found"
                });
            } else {
                const order = new orderModel({
                    product: req.body.product,
                    quantity: req.body.quantity
                });
            
                order
                    .save()
                    .then(result => {
                        res.json({
                            msg: "order stored",
                            orderInfo: {
                                _id: result._id,
                                product: result.product,
                                quantity: result.quantity
                            }
                        });
                    })
                    .catch(err => {
                        res.json({
                            error: err
                        })
                    });
            
            }
        });
    
    
});

router.patch("/", (req, res) => {
    res.status(200).json({
        msg: "order patch success"
    });
});

router.delete("/", (req, res) => {
    res.status(200).json({
        msg: "order delete success"
    });
});

module.exports = router;
