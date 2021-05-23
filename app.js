//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
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

mongoose.connect(`mongodb+srv://vatsuvaksi:${process.env.password}@cluster0.hmhkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{useNewUrlParser :true , useUnifiedTopology : true})
.then(() =>{console.log("DB Connected")})
.catch((err) =>{console.log(err.message)});

const userSchema = new mongoose.Schema({
    email :String,
    password :String
});


userSchema.plugin(encrypt,{secret:process.env.secret , encryptedFields: ["password"]});

const User = new mongoose.model("User" , userSchema);
app.post("/register", (req,res)=>{
    const newUser = new User({
        email : req.body.username,
        password:req.body.password
    })
    newUser.save((err)=>{
        if(err){
            console.log(err);
        }else{
            res.render("secrets");
        }
    })
});
app.post("/login",(req,res)=>{
    const newUser = new User({
        email : req.body.username,
        password:req.body.password
    })
    User.findOne({email : newUser.email}, (err, foundUser)=>{
        if(err){
            console.timeLog(err);
        }else{
            if(foundUser){
                if(foundUser.password === newUser.password){
                    res.render("secrets");
                }else{
                    
                }
            }else{

            }
        }
    })
});
app.listen(3000, ()=>{
    console.log("Listening on 3000");
});

