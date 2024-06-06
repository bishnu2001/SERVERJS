const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session'); // Corrected require statement
const flash = require('connect-flash');
const indexRouter = require('./v1/routes/index');
const usersRouter = require('./v1/routes/users');
const indexAdminRouter = require('./admin/routes/index');
const adminRouter = require('./admin/routes/admin');
const adminUserRoutes = require('./admin/routes/user.routes');
const holidayRouter = require('./v1/routes/holiday')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); // Added require statement
const holidayRouter=require('./v1/routes/Holidays');
const userprofileRouter=require('./v1/routes/Userprofile');
const useremergencyinfoRouter=require('./v1/routes/useremergencyinfo');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(flash());

app.use(
  cookieSession({
    // Cookie config, take a look at the docs...
    name: 'session',
    secret: 'I Love India...',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false // Corrected to false for development environment
    },
  }),
);


const options = {
  definition: {
      openapi: '3.0.0', // Specify the OpenAPI version
      info: {
          title: 'HRMS API DOCUMENTATION',
          version: '1.0.0',
          description: 'Your API Description',
      },
  },
  apis: ['./v1/routes/*.js', './admin/routes/*.js'], // Combined the arrays
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Database connection with MongoDB
const mongoose = require('./config/database');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/holidays', holidayRouter);
app.use('/v1/userprofile', userprofileRouter);
app.use('/v1/useremergencyinfo', useremergencyinfoRouter);
app.use('/v1/', indexAdminRouter);
app.use('/admin', adminRouter);
app.use('/admin/users', adminUserRoutes);
app.use('/holiday',holidayRouter)


app.use('*',(req,res)=>{
  res.json("not found")
})
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("err..........", err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;