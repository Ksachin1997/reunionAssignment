const db = require("../models");

module.exports = {
    getUserByEmail
}

function getUserByEmail(email){

    return db.User.findOne({
        where: {
            email: email
        }
    })

}