const express = require("express");
const connectDB = require("./db");
const userRoute = require('./routes/user.route.js');
const userupdate = require('./routes/userupadates.route.js');
const useAccount = require('./routes/account.route.js');
const isAuthenticated = require("./middleware/auth.middleware.js");

require('dotenv').config()
connectDB();

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hi there")
})

app.use('/api/auth',userRoute);
app.use('/api/user',isAuthenticated,userupdate);
app.use('/api/account',isAuthenticated,useAccount);

app.listen(3000)