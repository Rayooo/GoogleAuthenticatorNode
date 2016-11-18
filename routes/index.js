var express = require('express');
var router = express.Router();
var speakeasy = require("speakeasy");

/* GET home page. */
router.get('/', function(req, res, next) {
    var secret = speakeasy.generateSecret();
    var url = speakeasy.otpauthURL({ secret: secret.ascii, label: 'Ray', algorithm: 'sha512' });
    res.render('index', { title: secret,qrcode: "http://qr.liantu.com/api.php?&w=400&text=" + url });

});

module.exports = router;
