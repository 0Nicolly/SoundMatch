var express = require('express');
var router = express.Router();

router.get("/", async (req, res) => { 
    res.render("about", {
        title: "Sound Match",
    });
});

module.exports = router;