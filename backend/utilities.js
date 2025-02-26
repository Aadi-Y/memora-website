const jwt = require("jsonwebtoken");

function authenticateToken(req,res,next){
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader &&  authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            return res.status(400).json({message:"Access denied"});
        }
        
        jwt.verify(token,"test@123",(err,user)=>{
            if(err){
                return res.sendStatus(401);
            }
            else{
                req.user = user;
                next();
            }
    
        })
    }
    
}

module.exports ={
    authenticateToken
}