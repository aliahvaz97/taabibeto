const usersRoute = require('../server/routes/user-route')
const express = require('express')
const morgan = require('morgan')
require ('dotenv').config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(morgan('tiny'))

app.use('/api/users/', usersRoute);


const port = process.env.APP_PORT || 3000;
app.listen (port,()=>{
    console.log(`Listening port ${port}`)
});