//define dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
//importing routes
const productRoutes = require('./routes/product.routes')

//Setup Request body JSON Parsing
app.use(bodyParser.json());
//Enable All CORS Requests
app.use(cors());
//product service
app.use(productRoutes);

//defining .env file values
const PORT = process.env.PORT;
const DB_URL= process.env.DB_URL;

//establishing Database connection
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:  true
})
.then(()=>{
    console.log('DB is connected');
})
.catch((err)=>console.log('DB connection err',err));

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});
