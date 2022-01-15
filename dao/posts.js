const db = require("../models");

module.exports = {
    addPost,
    deletePost,
    getPostById,
    fetchAllPostsOfUser
}

function addPost(userId,title,description){
    return db.Post.create({
        userId: userId,
        title: title,
        description: description
    })
}

function deletePost(id){
    return db.Post.destroy({
        where: {
            id: id
        }
    })
}

function getPostById(id){
    return db.Post.findByPk(id)
}

function fetchAllPostsOfUser(userId){

    return db.Post.findAll({
        where: {
            userId: userId
        },
        attributes: ["id","title","description","createdAt"],
        include: [
            {
                model: db.PostComment,
                attributes: ["comment"]
            },{
                model: db.PostLike,
                attributes: ["userId"]
            }
        ],
        order: [["createdAt","ASC"]]
    })

}
