const mongoose = require("mongoose");
const noteSchema = mongoose.Schema;

const newNoteSchema = new noteSchema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    drawing:{
        type:String,
        default:""
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        required:true,
        ref:"User"

    },
    createdOn:{
        type:Date,
        default: new Date().getTime()
    }
    
})

module.exports = mongoose.model("Notes",newNoteSchema);