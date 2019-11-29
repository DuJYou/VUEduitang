var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cinemaRouter = require('./routes/cinema');
var movieHotRouter = require('./routes/movie_hot');
var movieUpcomingRouter = require('./routes/movie_upcoming');
const authMiddleware = require('./middlewares/auth')
var app = express();

// view engine setup
// 视图引擎设置
app.engine('art', require('express-art-template'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
  escape: false
});
//配置引擎
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'art')

app.use(logger('dev'));
//配置json
app.use(express.json());
//配from表单
app.use(express.urlencoded({
  extended: false
}));
//静态资源目录 
app.use(express.static(path.join(__dirname, 'public')));
//配置cookie
app.use(cookieParser());


app.use(cookieSession({
  name: 'session',
  secret: '012345abcde',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
//两个路由
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/cinema', authMiddleware, cinemaRouter)
// app.use('/api/movieHot', authMiddleware, movieHotRouter)
app.use('/api/movieHot',movieHotRouter)
app.use('/api/movieUpcoming', authMiddleware, movieUpcomingRouter)

// catch 404 and forward to error handler
// 捕获404并转发给错误处理程序
//req 获取
//res发送
//next 执行下一部
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // 设置局部变量，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;