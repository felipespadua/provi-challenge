const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pathSchema = new Schema({
  order: [{type: String}]
}, {
  timestamps: true
});

pathSchema.methods.getNextEndpoint = function getNextEndpoint(endpoint) {
  try{
    let path = this
    let order = path.order
    let index = order.findIndex(el => el === endpoint)
    return order[index + 1] === undefined ? 'none' : order[index + 1]
  }catch(err){
    return err
  }
};

const Path = mongoose.model('Path', pathSchema);

module.exports = Path;