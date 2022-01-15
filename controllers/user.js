const express = require("express");
const router = express.Router();
const {loginUser} = require("../service/user")

router.post("/",loginUser)

module.exports = router;