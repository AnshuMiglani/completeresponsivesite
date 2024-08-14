const mongoose= require("mongoose");
const express= require("express");
const validator= require("validator");
const jwt= require("jsonwebtoken");

const newschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("INvalid Email");
                
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }
    ]
});
newschema.methods.tokenbanao=async function(){
    try{
        const data= jwt.sign({_id: this._id},"namstedsotomeranaamanshuhaibasyahibtanahai");
        // console.log(data);
        this.tokens= this.tokens.concat({token:data});
        await this.save();
        return data;
    }catch(e){
        console.log(e);
        // res.send(e);
    }
};
const member= new mongoose.model("datamember",newschema);
module.exports = member; 