const router = require('express').Router();
const User = require('../model/User');
const { registerValidation,loginValidation } = require('./validation');
const bcrypt = require('bcryptjs')


//REGISTER
router.post('/register', async ( req,res) => {
//LETS VALIDATE THE DATA BEFORE WE A USER
const { error } = registerValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);
//CHECK USER DATABASE
const emailExit = await User.findOne({email: req.body.email});
if (emailExit) return res.status(400).send('Email alreadey exits');
//HASH PASSWORD
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt)

//CREATE USER
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    try{
      const saveUser = await user.save();
      res.send(saveUser);
    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async ( req,res) => {
//LOGIN VALIDATE
const { error } = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);
//CHECK EMAIL EXISTS
const user = await User.findOne({email: req.body.email});
if (!user) return res.status(400).send('Email is not found');
//PASSWORD IS CORRECT
const validOass = await bcrypt.compare(req.body.password, user.password);
if(!validOass) return res.status(400).send('invalid password')
res.send('logged in')
})

module.exports = router;
