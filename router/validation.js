//VALLIDATION
const { date } = require('joi');
const joi =require('joi');

//REGISTER VALLIDATION
const registerValidation = date => {
const shema = joi.object({
  name : joi.string().min(6).required(),
  email: joi.string().min(6).required().email(),
  password: joi.string().min(6).required()
})
//LETS VALIDATE THE DATA BEFORE WE A USER
return shema.validate(date);
};
//LOGIN VALLIDATION
const loginValidation = date => {
    const shema = joi.object({
      email: joi.string().min(6).required().email(),
      password: joi.string().min(6).required()
    })
    //LETS VALIDATE THE DATA BEFORE WE A USER
    return shema.validate(date);
    };


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
