// import model
const { user } = require("../../models");

// import joi validation
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt");
//import jsonwebtoken
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    // we generate salt (random value) with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // we hash password from request with salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userExist = await user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (userExist) {
        return res.status(400).send({
          status: "failed already",
          message: "user already exist",
        });
      }

    const newUser = await user.create({
      ...req.body,
      password: hashedPassword,
      status: 'customer'
    });

    // generate token
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  //export data error
  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    //jika email tidak ditemukan
    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email tidak ditemukan",
      });
    }

    //output nilai boolean hasil dari compare req.body dan database
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    //compare
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password tidak sesuai",
      });
    }
    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        fullname: userExist.fullname,
        email: userExist.email,
        status: userExist.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          email: dataUser.email,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};