const jwt = require('jsonwebtoken');

function autch (req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.statun(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET || 'Supersecret');
        req.user = verified;
    }catch(err){
        res.statun(400).send('Invalid Token');
    }
}