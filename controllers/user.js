const User = require("../models/User")
const Path = require("../models/Path")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const {
  body,
  validationResult,
  check
} = require('express-validator/check');
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
      Path.findOne().sort({
          created_at: -1
        })
        .then(newestPath => {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          const newUser = new User({
            email,
            password: hashPass,
            path: newestPath.id
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
    res.status(422).json({
      errors: errors.array()
    });
    return;
  }
  User.findById(req.userId)
    .populate('path')
    .then(user => {
      user.upsert("cpf", data)
        .then(user => {
          res.status(200).json({
            success: true,
            next_end_point: user.path.getNextEndpoint(req.endpoint)
          })
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
    res.status(422).json({
      errors: errors.array()
    });
    return;
  }
  User.findById(req.userId)
    .populate('path')
    .then(user => {
      user.upsertName(data, "full-name")
        .then(user => {
          res.status(200).json({
            success: true,
            next_end_point: user.path.getNextEndpoint(req.endpoint)
          })
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
    res.status(422).json({
      errors: errors.array()
    });
    return;
  }
  User.findById(req.userId)
    .populate('path')
    .then(user => {
      user.upsertBirthday(data, "birthday")
        .then(user => {
          res.status(200).json({
            success: true,
            next_end_point: user.path.getNextEndpoint(req.endpoint)
          })
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
    res.status(422).json({
      errors: errors.array()
    });
    return;
  }
  User.findById(req.userId)
    .populate('path')
    .then(user => {
      user.upsert("phoneNumber", data, "phone-number")
        .then(user => {
          res.status(200).json({
            success: true,
            next_end_point: user.path.getNextEndpoint(req.endpoint)
          })
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
    res.status(422).json({
      errors: errors.array()
    });
    return;
  }
  User.findById(req.userId)
    .populate('path')
    .then(user => {
      user.upsertAddress(data, "address")
        .then(response => {
          res.status(200).json({
            success: true,
            next_end_point: user.path.getNextEndpoint(req.endpoint)
          })
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
    res.status(422).json({
      errors: errors.array()
    });
    return;
  }
  User.findById(req.userId)
    .populate('path')
    .then(user => {
      user.upsert("amountRequested", data, "amount-requested")
        .then(response => {
          res.status(200).json({
            success: true,
            next_end_point: user.path.getNextEndpoint(req.endpoint)
          })
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