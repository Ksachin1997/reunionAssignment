const db = require("../models");

module.exports = {
    getUserByEmail,
    getUserById
}

function getUserByEmail(email){

    return db.User.findOne({
        where: {
            email: email
        }
    })

}

function getUserById(id){

    return db.User.findByPk(id)

}