var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

// import 等语法要用到 babel 支持
require('babel-register');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('blog_node_cookie'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'blog_node_cookie',
        name: 'session_id', //# 在浏览器中生成cookie的名称key，默认是connect.sid
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }, //过期时间
    }),
);

const mongodb = require('./core/mongodb');

// data server
mongodb.connect();

//设置跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//将路由文件引入
const route = require('./routes/index');

//初始化所有路由
route(app);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// next()
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
