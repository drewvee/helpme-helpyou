var User = require('../users/userModel.js');

module.exports = {
  getGoals: function(req, res) {
    var user_id = req.params.user_id;

    User.findOne({ auth_id: user_id })
      .then(function(user) {
        var goals = user.goals;
        res.status(200).json(goals);
      });
  },

  addGoal: function(req, res) {
    var user_id = req.params.user_id;
    var goal = req.body;

    User.findOne({ auth_id: user_id })
      .then(function(user) {
        user.goals.push(goal);
        user.save();
        res.status(201).json(user.goals);
      });
  },

  updateGoal: function(req, res) {
    var user_id = req.params.user_id;
    var goal = req.body;
    var id = goal._id;
    delete goal._id; //so we don't cause problems

    User.findOne({ auth_id: user_id })
      .then(function(user) {
        for (var i = 0; i < user.goals.length; i++) {
          var g = user.goals[i];
          if (g._id == id) {
            for (var key in goal) {
              g[key] = goal[key];
            };
          }
        }
        user.save();
        res.status(201).json(user.goals);
      });
  }
};
