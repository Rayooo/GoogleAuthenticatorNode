/**
 * Created by Ray on 2016/11/20.
 */
var express = require('express');
var router = express.Router();
var speakeasy = require("speakeasy");
var passwordHash = require("password-hash");
var query = require("../config/mysqlConfig").queryAsync;

router.post("/register",function (req,res,next) {
    var userName = req.body.userName;
    var password = req.body.password;

    var hashedPassword = passwordHash.generate(password,{algorithm:"sha512",saltLength:20});

    query("INSERT INTO user SET ?",{username:userName,password:hashedPassword})
        .then(function (data) {
            res.send(data);
        })


})


module.exports = router;