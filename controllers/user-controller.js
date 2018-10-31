const fakeData = require('../models/fake-data');

module.exports = {
  users(req, res) {
    res.render('pages/user-list/template.art', { users: fakeData.users });
  },
  user(req, res) {
    const userId = req.params.id;
    const user = fakeData.users.filter(u => u.id.toString() === userId);
    if (user.length === 0) {
      res.render('pages/user-info/404.art', { id: userId });
      return;
    }
    res.render('pages/user-info/template.art', { user: user[0] });
  },
};
