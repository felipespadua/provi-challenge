const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  cpf: { type: String , unique: true},
  fullName : { type: String, unique: true },
  birthday: { type: Date, unique: true },
  phoneNumber: { type: Number, unique: true },
  address: {
    cep: { type : Number, unique: true },
    street: { type: String, unique: true },
    number: { type: Number, unique: true },
    complement: { type: String, unique: true },
    city: { type: String, unique: true },
    state: { type: String, unique: true }
  },
  token: { type: String, unique: true}

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;