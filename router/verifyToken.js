const jwt = require('jsonwebtoken');
const dat = Math.floor(Date.now() / 1000) - 30;
const env = require('dotenv')
module.exports = function (req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET || 'Supersecret');
        req.user = verified;
        //TIME LIVE TOKEN
        req.user.dat = dat-req.user.iat;
        if (req.user.dat<='200000') next();
        else return res.status(400).send('Invalid Token');
    }catch(err){
        res.statun(400).send('Invalid Token');
    }
}
