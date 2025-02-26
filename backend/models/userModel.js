const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUserSchema = new Schema(
    {
        email:{type:String},
        orgPassword:{type:String},
        confirmPassword:{type:String},
        createdOn:{type:Date,default:new Date().getTime()},

    }
    
)

module.exports = mongoose.model("User",newUserSchema);