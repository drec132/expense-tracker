const db = require('../models');
const Users = db.users;

exports.login = (req, res) => {
    Users.find(req.body)
        .then(users => res.json({ success: true, data: users }))
        .catch(err => res.status(422).json(err));
}   