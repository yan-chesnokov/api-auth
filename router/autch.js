const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('./validation');


router.post('/register', async ( req,res) => {
//LETS VALIDATE THE DATA BEFORE WE A USER
const { error } = registerValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);
//CHECK USER DATABASE
const emailExit = await User.findOne({email: req.body.email});
if (emailExit) return res.status(400).send('Email alreadey exits');
//CREATE USER
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    try{
      const saveUser = await user.save();
      res.send(saveUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;
