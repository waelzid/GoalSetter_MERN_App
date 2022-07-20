const express = require('express');
const colors =require('colors')
const dotenv= require('dotenv').config;
const port = process.env.PORT || 5000
const connectDB = require('./config/db');
const errorHandler =require('./middleware/errorMiddleware');
const app = express()

connectDB();


// the middleware u need in order to use the body of the request inside a script 
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes'))

app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler);

app.listen(port,()=> console.log("server started on port ",port) )

