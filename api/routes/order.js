const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "order success"
    });
});

router.post("/", (req, res) => {
    res.status(200).json({
        msg: "order post success"
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
