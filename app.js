const express = require("express");
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoutes')
const cookieParser = require('cookie-parser');
const {connectDb} = require('./database/db')
const methodOverride = require('method-override')
require('dotenv').config()
const port = process.env.PORT;
const app = express();

//middleware
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(userRouter);



app.use('/api/v1', adminRouter);

async function connectServer() {
    await connectDb()
    app.listen(port, () => console.log(`server is running on ${port}`))
}   

connectServer()


