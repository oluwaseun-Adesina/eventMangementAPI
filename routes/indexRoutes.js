const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const path = require("path");

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use("/auth", authRoutes);

router.all("*", (req, res) => {
    res.status(404).send("404 - Page not found");
})

module.exports = router;