var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var data = require('./routes/data');

var app = express();
var ResultState = require('./ResultState');
const createSql = require('./config/mysqlConfig').createSql;
const mysqlQueryAsync = require('./config/mysqlConfig').queryAsync;

//初始化数据库
mysqlQueryAsync(createSql).then(function (result) {
    console.log("创建user表成功");
}).error(function () {
    if (err) {
        console.error("创建user表失败");
    }
}).catch(function (err) {
    if (err) {
        console.error("创建user表失败");
    }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//添加res.success和res.error
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); //允许哪些url可以跨域请求到本域
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT"); //允许的请求方法，一般是GET,POST,PUT,DELETE,OPTIONS
    res.setHeader("Access-Control-Allow-Headers","x-requested-with,content-type,login_token,userid"); //允许哪些请求头可以跨域
    res.error = function (errorCode, errorReason) {
        var resultState = new ResultState();
        resultState.code = errorCode;
        resultState.errorReason = errorReason;
        res.send(resultState);
    };

    res.success = function (returnValue) {
        var resultState = new ResultState();
        resultState.code = ResultState.NO_ERROR;
        resultState.returnValue = returnValue || {};
        res.send(resultState);
    };

    next();
});

//身份安全认证
app.use(function (req, res, next) {
    //登录接口不需要token认证
    if(req.originalUrl == "/user/login"||req.originalUrl == "/user/register"||req.originalUrl == '/'||req.originalUrl == '/data/allData'){
        next();
        return;
    }
    var token = req.headers.login_token;
    var userid = req.headers.userid;
    mysqlQueryAsync("SELECT token_create_time FROM user WHERE token = ? AND id = ?", [token, userid])
        .then(function (data) {
            if (data[0] && data[0].length > 0 && data[0][0].token_create_time) {
                var token_create_time = new Date(data[0][0].token_create_time).getTime();
                //token有效时间为24小时
                if (new Date().getTime() - token_create_time > 24 * 60 * 60 * 1000) {
                    res.error(ResultState.AUTH_ERROR_CODE, "登录已过期，请重新登录");
                } else {
                    next();
                }
            } else {
                res.error(ResultState.AUTH_ERROR_CODE, "非法访问");
            }
        }, function (err) {
            res.error(ResultState.SERVER_EXCEPTION_ERROR_CODE, err);
        })
});

//加入自定义路由
app.use('/', index);
app.use('/user', user);
app.use('/data', data);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
