const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "product success"
    });
});

router.post("/", (req, res) => {

    const product = {
        productName: req.body.name,
        productPrice: req.body.price
    };


    res.status(200).json({
        msg: "product post success",
        productInfo: product
    });
});

router.patch("/", (req, res) => {
    res.status(200).json({
        msg: "product patch success"
    });
});

router.delete("/", (req, res) => {
    res.status(200).json({
        msg: "product delete success"
    });
});

module.exports = router;