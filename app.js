const express=require("express");
const path=require("path");
const app=express();
const bodyparser=require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gymEntry',{useNewUrlParser: true});
const port=80;

const gymSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    problem:String,
    More:String
});

var Gym = mongoose.model('Kitten', gymSchema);

app.use(express.static('public'));
app.use(express.urlencoded())

app.set('view engine','pug')  // Set the template engine as pug
app.set('views',path.join(__dirname,'views'));  // Set the views directory

app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('index.pug',params);
})
app.get('/register',(req,res)=>{
    const params = { }
    res.status(200).render('register.pug',params)``;
})

app.post('/register',(req,res)=>{
    var myData=new Gym(req.body)
    myData.save().then(()=>{
        res.send("The item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("The item has not been saved")
    })
    // res.status(200).render('contact.pug',params);
})
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`)
})