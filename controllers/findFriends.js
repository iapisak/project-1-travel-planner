const db = require('../models')

const findFriends = (req, res) => {
    db.User.find({}, (err, findFriend) => {
        if (err) {console.log(err)}
        res.json({
            status: 200,
            data: findFriend,
        })
    })
}

module.exports = {
    findFriends,
}