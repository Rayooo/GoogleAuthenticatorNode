/**
 * Created by Ray on 2016/11/26.
 */
var express = require('express');
var router = express.Router();
var query = require("../config/mysqlConfig").queryAsync;
var ResultState = require("../ResultState");

router.get("/allData",function (req, res, next) {
    query("SELECT * FROM user")
        .then(function (data) {
            res.success(data[0]);
        })
        .error(function (data) {
            res.error(ResultState.SERVER_EXCEPTION_ERROR_CODE,"服务器异常");
        })
});


module.exports = router;