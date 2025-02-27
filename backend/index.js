require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {authenticateToken} = require("./utilities.js");
const config = require("./config.json");
const mongoose = require("mongoose");
const port = 5000;
const app = express();
mongoose.connect(config.connectionString);
const User = require("./models/userModel.js");
const Notes = require("./models/notesModel.js")
const jwt = require("jsonwebtoken");
app.use(express.json());
const bcrypt = require("bcrypt");


app.use(cors(
    {origin:"*"}
));

app.get("/",(req,res)=>{
    res.json("It is working");
})

app.post("/signup",async (req,res)=>{
    try{
        const {email,orgPassword,confirmPassword} = req.body;
        if(!email){
            return res.status(400).json({error:true,message:"Please enter email"});
        }
        if(!orgPassword){
            return res.status(400).json({error:true,message:"Please enter password"});
        }
        if(!confirmPassword){
            return res.status(400).json({error:true,message:"Please enter confirm password"});
        }
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({error:true,message:"The user Aldready exist"});
        }

        if(orgPassword !== confirmPassword){
            return res.status(400).json({error:true,message:"Both the password must be same"})
        }
        const hashedPassword = await bcrypt.hash(orgPassword,10);

        const newUser = await User.create({
            email,
            orgPassword : hashedPassword,
        })

        const token = jwt.sign({id:newUser._id,email:newUser.email},"test@123",{expiresIn : "36000m"})

        return res.status(200).json({message:"Registration successfully",
            email,
            token,
            user:newUser
        });
    }
    catch(err){
        res.status(400).json(err.message);
    }
   
})

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email){
            return res.status(400).json({error:true,message:"Please enter email"});
        }
        if(!password){
            return res.status(400).json({error:true,message:"Please enter password"});
        }
        
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({error:true,message:"User does not exist"});
        }

        console.log(existingUser);

        const isPasswordValid = await bcrypt.compare(password,existingUser.orgPassword);
        
        if(!isPasswordValid){
            return res.status(400).json({error:true,message:"Invalid password"});
        }

        if(existingUser && isPasswordValid){
            const user = {id:existingUser._id,email:existingUser.email};
            const token = jwt.sign(user,"test@123",{expiresIn:"36000m"});
            return res.status(200).json({error:false,message:"Login successfull",user,token})
        }
        else{
            return res.status(400).json({error:true,message:"Login failed",});
        }
    }
    catch(err){
        return res.status(400).json(err.message);
    }
})

app.post("/add-notes",authenticateToken,async (req,res)=>{
    try{
       const {title,content,tags} = req.body;
       const {user} = req;

       if(!title && !content){
        return res.status(400).json({error:true,message:"Please provide title and content"});
       }

       const note = new Notes({
        title,
        content,
        tags:tags || [],
        userId: user.id
       })

       await note.save();

       return res.status(201).json({
        error:false,
        message:"Notes created Successfully",
        note
       })
    }
    catch(err){
        res.status(500).json(err.message)
    }
    
}
)

app.put("/edit-note/:noteId",authenticateToken,async (req,res)=>{
    const noteId = req.params.noteId;
    const {title,content,tags,isPinned} = req.body;
    const {user} = req;

    if(!title && !content && !tags){
        return res.status(400).json({error:true,message:"No changes provided"});
    }
    try{
        const note = await Notes.findOne({_id:noteId,userId:user.id});

        if(!note){
            return res.status(404).json({error:true,message:"Note not found"});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note updated successfully",
        })
    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal Sever Error"
        })
    }
})

app.get("/get-all-notes/",authenticateToken,async (req,res)=>{
    const {user} = req;

    try{
        const notes = await Notes.find({userId : user.id}).sort({isPinned:-1});

        return res.status(201).json({
            error:false,
            notes,
            message:"All notes are retrieved successfully"
        })
    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error"
        })
    }
})

app.delete("/delete-note/:noteId",authenticateToken,async (req,res)=>{
    const noteId = req.params.noteId;
    const {user} = req;

    try{
        const note = await Notes.findOne({_id:noteId,userId : user.id});

        if(!note){
            return res.status(400).json({
            error:true,
            message:"Note not found"});
        }

        await Notes.deleteOne({_id:noteId, userId:user.id});

        return res.status(200).json({
            error:false,
            message:"Note deleted successfully"
        })
    }
    catch(err){
        return res.json({
            error:true,
            message:"Internal server error"
        })
    }
})

app.put("/edit-pinned/:noteId",authenticateToken,async (req,res)=>{

    const noteId = req.params.noteId;
    const {isPinned} = req.body;
    const {user} = req;

    try{
        const note = await Notes.findOne({_id:noteId,userId:user.id})

        if(!note){
            return res.status(400).json({
                error:true,
                message:"Note not found"
            })
        }

        note.isPinned = isPinned || false;
        await note.save();

        return res.status(200).json({
            error:false,
            message:"Updated successfully",
            note
        })

    }catch(err){
        return res.status(400).json({error:true,
            message:"Some Internal error occured"
        })
    }

})
app.get("/get-user",authenticateToken,async (req,res)=>{
    const {user} = req;
    
    
     if(!user){
        return res.status(400).json({
            error:true,
            message:"User not found"
        })
    }
    try{
        const users = await User.find({_id:user.id});

        res.status(200).json({
            error:false,
            users:users,
            message:""
        })
    }
    catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal error occur",
            error:err
    })

    } 
   
})

app.get("/search-notes",authenticateToken,async (req,res)=>{
    const {user} = req;
    const {query} = req.query;

    if(!query){
        return res.status(400).json({
            error:true,
            message:"Search query is required"
        })
    }

    try{
        const matchingNotes = await Notes.find({
            userId : user.id,
            $or:[
                {title : {$regex : new RegExp(query,"i")}},
                {content : {$regex : new RegExp(query,"i")}},
            ]
        })

        res.status(200).json({
            error:false,
            matchingNotes,
            message:"The note that matches for the search query"
        })


    }
    catch(err){
        if(err.response && err.response.data){
            console.log(err.response.data.message);
        }
    }
})



app.listen(port,()=>{
    console.log("The app is running in the port of : ",port);
})