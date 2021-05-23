//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res)=>{
    res.render( "home");
})

app.get("/login", (req,res)=>{
    res.render( "login");
})
app.get("/register", (req,res)=>{
    res.render( "register");
})

mongoose.connect("mongodb+srv://vatsuvaksi:password321@cluster0.hmhkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser :true , useUnifiedTopology : true})
.then(() =>{console.log("DB Connected")})
.catch((err) =>{console.log(err.message)});




app.listen(3000, ()=>{
    console.log("Listening on 3000");
});

