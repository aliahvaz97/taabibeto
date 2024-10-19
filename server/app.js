const usersRoute = require('../server/routes/user-route')
const express = require('express')
require ('dotenv').config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/users', usersRoute.router);


const port = process.env.APP_PORT || 3000;
app.listen (port,()=>{
    console.log(`Listening port ${port}`)
});