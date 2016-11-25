/**
 * Created by Ray on 2016/11/20.
 */
var express = require('express');
var router = express.Router();
var speakeasy = require("speakeasy");
var passwordHash = require("password-hash");
var query = require("../config/mysqlConfig").queryAsync;
var ResultState = require("../ResultState");

router.put("/register",function (req,res,next) {
    var username = req.body.username;
    var password = req.body.password;
    var secret_key = speakeasy.generateSecret().base32;
    var token = speakeasy.generateSecret().base32;
    var url = "http://qr.liantu.com/api.php?&w=400&text=" + speakeasy.otpauthURL({ secret: secret_key, label: username, algorithm: 'sha1' });
    var hashedPassword = passwordHash.generate(password,{algorithm:"sha512",saltLength:20});
    query("INSERT INTO user(username,password,secret_key,token,token_create_time) VALUE(?,?,?,?,?)",[username,hashedPassword,secret_key,token,new Date()])
        .then(function (data) {
            res.success(url);
        })
        .error(function (data) {
            res.error(ResultState.BUSINESS_ERROR_CODE,"注册错误");
        })
});

router.post("/login",function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var code = req.body.code;
    //校验密码
    query("SELECT id,username,password,secret_key,token,token_create_time FROM user WHERE username=?",[username]).then(function (data) {
        var queryResult = data[0][0];
        if(data[0] && queryResult && passwordHash.verify(password, queryResult.password)){
            var tokenValidates = speakeasy.totp.verify({
                secret: queryResult.secret_key,
                token: code
            });
            //检验动态密码
            if(tokenValidates){
                var userInfo = {
                    username:queryResult.username,
                    //重新生成token
                    token:speakeasy.generateSecret().base32,
                    id:queryResult.id
                };
                //刷新token
                query("UPDATE user SET token = ?,token_create_time = ? WHERE id = ?",[userInfo.token, new Date(),userInfo.id])
                    .then(function(data){
                        //一切顺利返回用户信息
                        res.success(userInfo);
                        return;

                    }).error(function(err){
                        res.error(ResultState.SERVER_EXCEPTION_ERROR_CODE, err);
                        return;
                })
            }else{
                res.error(ResultState.BUSINESS_ERROR_CODE,"动态密码错误")
            }
        }
        else{
            res.error(ResultState.BUSINESS_ERROR_CODE, "密码错误");
        }
    }).error(function (error) {
        res.error(ResultState.SERVER_EXCEPTION_ERROR_CODE, error);
    })
});

module.exports = router;