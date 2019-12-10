const User = require("../models/User")
const Path = require("../models/Path")

module.exports = function verifyPath(req, res, next){
  let endpoint = req.route.path.replace("/","")
  User.findById(req.userId)
  .then(user => {
    Path.find()
    .then(path => {
      let order = path[0].order
      let index = order.findIndex(el => el === endpoint)
      if (order[index - 1] !== undefined && order[index - 1] !== user.lastUpdated) {
        let lastUpdatedIndex = order.findIndex(el => el === user.lastUpdated)
        return res.status(400).json({success: false, message: `Incorrect order, next_end_point: ${order[lastUpdatedIndex + 1]}`});
      }
      next()
    })
  })
  .catch(err => {
    return res.status(400).json(err);
  })
}
