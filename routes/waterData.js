const express = require('express');
const app = express.Router();

app.get("/",(req, res) => {
    res.send("Hello from water dept HOME")
})

app.get("/whome",(req, res) => {
    res.send("Hello from water dept")
})
module.exports = app