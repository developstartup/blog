const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("order get");
});

module.exports = router;
