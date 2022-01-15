const db = require("../models");

module.exports = {
    deleteAllLikesOfPost,
    createLike,
    deleteLike,
    alreadyLiked,
    getAllLikedOfPost
}

function deleteAllLikesOfPost(postId){

    return db.PostLike.destroy({
        where: {
            postId: postId
        }
    })

}

function createLike(userId,postId){

    return db.PostLike.create({
        userId: userId,
        postId: postId
    })

}

function alreadyLiked(userId,postId){

    return db.PostLike.findOne({
        where: {
            userId: userId,
            postId: postId
        }
    })

}

function deleteLike(userId,postId){

    return db.PostLike.destroy({
        where: {
            userId: userId,
            postId: postId
        }
    })

}

function getAllLikedOfPost(postId){
    return db.PostLike.findAll({
        where: {
            postId: postId
        },
        attributes: ["userId"]   
    })
}