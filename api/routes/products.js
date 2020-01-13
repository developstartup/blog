const express = require('express');
const router = express.Router();

const productModel = require('../models/product');



// total product 불러오기
router.get("/", (req, res) => {

    productModel
        .find()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/product/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
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
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/product"
                    }
                });
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
        .update({_id: ID}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/product"
                }
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
                msg: "Deleted",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/product"
                }
            });
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