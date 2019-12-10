const mongoose = require('mongoose');
const Path = require('./Path');
const moment = require('moment');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: [{
    data: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true
    }
  }],
  fullName: [{
    data: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
    },
    updatedAt: {
      type: Date,
      required: true
    }
  }],
  birthday: [{
    data: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true
    }
  }],
  phoneNumber: [{
    data: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true
    }
  }],
  address: [{
    data: {
      cep: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      number: {
        type: Number,
        required: true
      },
      complement: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      }
    },
    updatedAt: {
      type: Date,
      required: true
    }
  }],
  amountRequested: {
    type: Number
  },
  lastUpdated: {
    type: String
  },
  path: {
    type: Schema.Types.ObjectId,
    ref: 'Path',
  }

}, {
  timestamps: true
});

userSchema.methods.upsert = function upsert(field, data, path) {
  let user = this
  let index = user[field].findIndex(el => el.data === data)
  user.lastUpdated = field
  if (index === -1) {
    user[field].push({
      data,
      updatedAt: moment().toDate()
    })
    return user.save()
  } else {
    user[field][index].updatedAt = moment().toDate()
    return user.save()
  }
};

userSchema.methods.upsertName = function upsertName(data) {
  let user = this
  let splittedName = data.split(" ")
  let newData = {
    firstName: splittedName[0],
    lastName: splittedName[1]
  }
  let index = user.fullName.findIndex(el => el.data.firstName === newData.firstName && el.data.lastName === newData.lastName)
  if (index === -1) {
    user.fullName.push({
      data: newData,
      updatedAt: moment().toDate()
    })
    return user.save()
  } else {
    user.fullName[index].updatedAt = moment().toDate()
    return user.save()
  }
};

userSchema.methods.upsertBirthday = function upsertBirthday(data) {
  let user = this
  let index = user.birthday.findIndex(el => new Date(el.data).getTime() === new Date(data).getTime())
  if (index === -1) {
    user.birthday.push({
      data,
      updatedAt: moment().toDate()
    })
    return user.save()
  } else {
    user.birthday[index].updatedAt = moment().toDate()
    return user.save()
  }
};

userSchema.methods.upsertAddress = function upsertAddress(data) {
  const {
    cep,
    street,
    number,
    complement,
    city,
    state
  } = data
  let user = this
  let newData = {
    cep,
    street,
    number,
    complement,
    city,
    state
  }
  let index = user.address.findIndex(el => {
    return el.data.cep === cep && el.data.street === street && el.data.number === number && el.data.complement === complement && el.data.city === city && el.data.state === state
  })
  if (index === -1) {
    user.address.push({
      data: newData,
      updatedAt: moment().toDate()
    })
    return user.save()
  } else {
    user.address[index].updatedAt = moment().toDate()
    return user.save()
  }
};

userSchema.methods.isValidOrder = async function isValidOrder(field) {
  let user = this
  let path = await Path.find()
  
  let index = path[0].order.findIndex(el => el === field)
  
  if(path[index - 1] === null || path[index - 1] === user.lastUpdated ){
    
    return true
  }
  return false
}


const User = mongoose.model('User', userSchema);

module.exports = User;