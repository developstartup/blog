const express = require('express');
const router = express.Router();

const productModel = require('../models/product');



// total product 불러오기
router.get("/", (req, res) => {

    productModel
        .find()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                dataNum: docs.length,
                products: docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });



});


// 상세 product 불러오기
router.get("/:productID", (req, res) => {
    const ID = req.params.productID;
    productModel
        .findById(ID)
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    msg: "No product"
                });
            } else {
                res.status(200).json({
                    productInfo: doc
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
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
router.patch("/:productID", (req, res) => {
    const ID = req.params.productID;

    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.props] = ops.value;
    }



    productModel
        .findByIdAndUpdate(ID, { $set: updateOps})
        .then(result => {
            res.status(200).json({
                msg: "updated",
                productInfo: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });


});

// product 삭제
router.delete("/:productID", (req, res) => {
    const ID = req.params.productID;
    productModel
    .findByIdAndRemove(ID)
    .then(doc => {
        if (!doc) {
            res.status(404).json({
                msg: "No product"
            })
        } else {
            res.status(200).json({
                msg: "Deleted"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    }
    );
});

module.exports = router;