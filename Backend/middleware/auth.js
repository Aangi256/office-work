const jwt = require("jsonwebtoken");

const auth = (req , res, next)=>{
    const token =req.headers.authorization;
    
    if(!token){
        return res.status(401).json({message:"Access denied"});
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");

        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({message:"Invalid token"});
    }
};


module.exports = auth;




