const express = require('express');
const router = express.Router();

const productModel = require('../models/product');



// product 불러오기
router.get("/", (req, res) => {
    res.status(200).json({
        msg: "product success"
    });
});

// product 생성
router.post("/", (req, res) => {

    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });


    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg: "success",
                productInfo: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });



});


// product 수정
router.patch("/", (req, res) => {
    res.status(200).json({
        msg: "product patch success"
    });
});

// product 삭제
router.delete("/", (req, res) => {
    res.status(200).json({
        msg: "product delete success"
    });
});

module.exports = router;