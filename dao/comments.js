const db = require("../models");

module.exports = {
    deleteAllCommentsOfPost,
    addCommentOnPost,
    getAllCommentsOfPost
}

function deleteAllCommentsOfPost(postId){

    return db.PostComment.destroy({
        where: {
            postId: postId
        }
    })

}

function addCommentOnPost(userId,postId,comment){

    return db.PostComment.create({
        userId: userId,
        postId: postId,
        comment: comment
    })

}

function getAllCommentsOfPost(postId){

    return db.PostComment.findAll({
        where: {
            postId: postId
        },
        attributes: ["userId","comment"]  
    })

}