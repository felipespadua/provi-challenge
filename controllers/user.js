const User = require("../models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const { body, validationResult, check } = require('express-validator/check');
const validators = require("../validators")

exports.register = function (req, res) {
  const {
    email,
    password
  } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({
      message: "Indicate email and password"
    });
    return;
  }

  User.findOne({
      email
    })
    .then(user => {
      if (user !== null) {
        res.status(400).json({
          message: "The email already exists"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({
        email,
        password: hashPass,
      });
      newUser.save()
        .then(user => {
          const {
            id
          } = user
          const token = jwt.sign({
            id
          }, process.env.SECRET, {
            expiresIn: 30000 // expires in 500min
          });
          res.status(200).send({
            auth: true,
            token: token
          });
        })
        .catch(err => {
          res.status(400).json(err)
        })
    })
    .catch(error => {
      res.status(400).json(error)
    })
}

exports.register_cpf = function (req, res) {
  const {
    data
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  User.findById(req.userId)
    .then(user => {
      // console.log(user.isValidOrder("cpf"))
      // if(!user.isValidOrder("cpf")){
      //   console.log("AAAAAAA")
      //   res.json(400).json({ success: false, message: "Incorrect path order"})
      //   return
      // } 
      user.upsert("cpf", data)
        .then(user => {
          res.status(200).json({ success: true, next_end_point: "full-name"})
        })
        .catch(err => {
          res.status(400).json(err);
        })
    })
    .catch(err => {
      res.status(400).json(err);
    })
}

exports.register_full_name = function (req, res) {
  const {
    data
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  User.findById(req.userId)
    .then(user => {
      user.upsertName(data)
        .then(user => {
          res.status(200).json({ success: true, next_end_point: "birthday"})
        })
        .catch(err => {
          res.status(400).json(err);
        })
    })
    .catch(err => {
      res.status(400).json(err);
    })
}

exports.register_birthday = function (req, res) {
  const {
    data
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  User.findById(req.userId)
    .then(user => {
      user.upsertBirthday(data)
        .then(user => {
          res.status(200).json({ success: true, next_end_point: "phone-number"})
        })
        .catch(err => {
          res.status(400).json(err);
        })
    })
    .catch(err => {
      res.status(400).json(err);
    })
}

exports.register_phone_number = function (req, res) {
  const {
    data
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  User.findById(req.userId)
    .then(user => {
      user.upsert("phoneNumber", data)
        .then(user => {
          res.status(200).json({ success: true, next_end_point: "address"})
        })
        .catch(err => {
          res.status(400).json(err);
        })
    })
    .catch(err => {
      res.status(400).json(err);
    })
}

exports.register_address = function (req, res) {
  const {
    data
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  User.findById(req.userId)
    .then(user => {
      user.upsertAddress(data)
        .then(response => {
          res.status(200).json({ success: true, next_end_point: "amount-requested"})
        })
        .catch(err => {
          res.status(400).json(err);
        })
    })
    .catch(err => {
      res.status(400).json(err);
    })
}

exports.register_amount_requested = function (req, res) {
  const {
    data
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  User.findById(req.userId)
    .then(user => {
      user.upsert("amountRequested", data)
        .then(response => {
          res.status(200).json(response)
        })
        .catch(err => {
          res.status(400).json(err);
        })
    })
    .catch(err => {
      res.status(400).json(err);
    })
}

exports.validate = (method) => {
  switch (method) {
    case 'register_cpf': {
     return [ 
        body('data', 'data doesnt exists').exists(),
        body('data', 'data must be string').isString(),
        check('data').custom(validators.isValidCPF).withMessage('invalid CPF')
       ]   
    }
    case 'register_full_name': {
      return [ 
         body('data', 'data doesnt exists').exists(),
         body('data', 'data must be string').isString(),
        ]   
     }
     case 'register_birthday': {
      return [ 
         body('data', 'data doesnt exists').exists(),
         check('data').custom(validators.isValidDate).withMessage('invalid date')
        ]   
     }
     case 'register_phone_number': {
      return [ 
         body('data', 'data doesnt exists').exists(),
         body('data', 'data must be string').isString(),
        ]   
     }
    case 'register_address': {
      return [ 
         body('data', 'data doesnt exists').exists(),
         check('data').custom(validators.isValidAddress).withMessage('invalid address')
        ]   
     }
     case 'register_amount_requested': {
      return [ 
         body('data', 'data doesnt exists').exists(),
         body('data', 'data must be number').isNumeric(),
        ]   
     }
  }
}