const db = require("../models");

module.exports = {
    followUser,
    getAllFollowers,
    getAllFollowings,
    getWhetherFollowingOrNot,
    unFollowUser
}

function followUser(sourceId,targetId){

    return db.UserConnection.create({
        targetId: targetId,
        sourceId: sourceId
    })

}

function unFollowUser(sourceId,targetId){

    return db.UserConnection.destroy({
        where: {
            targetId: targetId,
            sourceId: sourceId
        }
    })

}

function getAllFollowers(id){

    return db.UserConnection.findAll({
        where: {
            targetId: id
        },
        attributes: ["sourceId"]
    })

}

function getAllFollowings(id){

    return db.UserConnection.findAll({
        where: {
            sourceId: id
        },
        attributes: ["targetId"]
    })

}

function getWhetherFollowingOrNot(sourceId,targetId){
    return db.UserConnection.findOne({
        where: {
            sourceId: sourceId,
            targetId: targetId
        }
    })
}