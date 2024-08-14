const express= require("express");
const app= express();
const path= require("path");
const port= process.env.PORT || 8000;
const hbs= require("hbs");
require("./db/conn");
const member= require("./models/data");
app.use(express.urlencoded({extended:false}));
hbs.registerPartials(path.join(__dirname,"/partials"));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/views")));
app.set("view engine","hbs");
app.get("/",(req,res)=>{
    res.render("main");
});

app.post("/",async(req,res)=>{
    try{
        const member1= new member({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });

        const token= await member1.tokenbanao();
        
        const savekarlo= await member1.save();
        res.render("main");
    }
    catch(e){
        res.status(400).send(e);
    }

});

app.listen(port,()=>{
    console.log("connection established");
});