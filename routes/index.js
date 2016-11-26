var express = require('express');
var router = express.Router();
var speakeasy = require("speakeasy");
var passwordHash = require("password-hash");

router.post("/verify",function (req, res, next) {
    var code = req.body.code;
    //这个key就是上面的secret.base32
    var secretKey = "HJMGY6KJHRHGEWS5PNET42BMMVLF423BMJTHS4S5NA5E6SCXNURQ";

    var tokenValidates = speakeasy.totp.verify({
        secret: secretKey,
        token: code
    });
    res.send({result:tokenValidates});
});


router.post("/register",function (req, res, next) {
    var password = req.body.password;
    var hashedPassword = passwordHash.generate(password,{algorithm:"sha512",saltLength:20});
    console.log(hashedPassword);

    console.log("检测密码是否正确" + passwordHash.verify('password123', hashedPassword));

    console.log("检测密码是否正确" + passwordHash.verify(password, hashedPassword));

    res.send({hashedPassword:hashedPassword});
});


router.post("/testNodemon",function (req, res, next) {
    var info = req.body.info;
    res.success(info);
});

module.exports = router;
