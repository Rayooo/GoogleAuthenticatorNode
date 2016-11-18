var express = require('express');
var router = express.Router();
var speakeasy = require("speakeasy");

/* GET home page. */
router.get('/', function(req, res, next) {
    var secret = speakeasy.generateSecret();

    res.render('index', { title: secret,qrcode: "http://qr.liantu.com/api.php?&w=400&text=" + secret.otpauth_url });

});

module.exports = router;
