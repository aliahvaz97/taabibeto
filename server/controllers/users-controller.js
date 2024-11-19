const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const UsersModel = require("../models/users_model")

const register = async (req,res,next) => {
        const schema = {
            fullname: Joi.string().min(3).max(50).required().messages({
              "string.min": 'تعداد کاراکتر کم است'
            }),
            phonenumber: Joi.string().min(11).max(11).required().messages({
              "string.min": 'تعداد کاراکتر کم است',
              "string.max": 'تعداد کاراکتر بیش از حد است'
            }),
            password:  Joi.string().min(5).max(50).required()
        }

        const validateResult = Joi.object(schema).validate(req.body);
        if (validateResult.error)
          return res.send(validateResult.error.details[0].message);

        const user = await UsersModel.getUserByPhoneNumber(req.body.phonenumber)
        if(user) return res.status(400).send("نام کاربری تکراری است")

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const result = await UsersModel.insertUser(req.body.fullname, req.body.phonenumber, hashPassword);
        console.log(result);

        const newUser = await UsersModel.getUserByPhoneNumber(req.body.phonenumber);
         res.send(_.pick(newUser,["Id","FullName","PhoneNumber"]));
           
}

const login = async (req,res,next) => {
  const schema = {
    phonenumber: Joi.string().min(11).max(11).required().messages({
      "string.min": 'تعداد کاراکتر کم است',
      "string.max": 'تعداد کاراکتر بیش از حد است'
    }),
    password:  Joi.string().min(5).max(50).required()
};
    const validateResult = Joi.object(schema).validate(req.body);
    if (validateResult.error)
    return res.send(validateResult.error.details[0].message);

    const user = await UsersModel.getUserByPhoneNumber(req.body.phonenumber);
    if(!user) return res.status(400).send("نام کاربری یا رمز عبور اشتباه است");

    const validPassword = await bcrypt.compare(req.body.password,user.Password);
    if(!validPassword) 
      return res.status(400).send("نام کاربری یا رمز عبور اشتباه است");
    res.send("ورود");
}

module.exports =
 {
    register,
    login
 }