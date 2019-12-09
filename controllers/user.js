const User = require("../models/User")

export function register(req, res) {
  const {email, password}  = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Indicate email and password" });
    return;
  }
  User.findOne({ email })
  .then(user => {
    if (user !== null) {
      res.status(400).json({ message: "The email already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    console.log(password, salt)
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err)
        res.render("signup", { message: "Something went wrong" });
      } else {
        res.redirect("/login");
      }
    });
  })
  .catch(error => {
    next(error)
  })
}

export function register_cpf(req, res) {
  const {data, token}  = req.body;
  User.findOneAndUpdate({ token }, { data }, { new: true })
  .then(updatedUser => {
    res.status(200).json({updatedUser})
  })
  .catch(err => {
    res.status(400).json(err);
  })
}

export function register_full_name(req, res) {
  const {data, token}  = req.body;
  User.findOneAndUpdate({ token }, { data }, { new: true })
  .then(user => {
    
  })
  .catch(err => {
    res.status(400).json(err);
  })
}

export function register_birthday(req, res) {
  const {data, token}  = req.body;
  User.findOneAndUpdate({ token }, { data }, { new: true })
  .then(user => {
    
  })
  .catch(err => {
    res.status(400).json(err);
  })
}

export function register_phone_number(req, res) {
  const {data, token}  = req.body;
  User.findOneAndUpdate({ token }, { data }, { new: true })
  .then(user => {
    
  })
  .catch(err => {
    res.status(400).json(err);
  })
}

export function register_address(req, res) {
  const {data, token}  = req.body;
  User.findOneAndUpdate({ token }, { data }, { new: true })
  .then(user => {
    
  })
  .catch(err => {
    res.status(400).json(err);
  })
}