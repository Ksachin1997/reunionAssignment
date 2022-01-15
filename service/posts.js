const {addPost,deletePost,getPostById,fetchAllPostsOfUser} = require("../dao/posts")
const {deleteAllLikesOfPost,createLike,deleteLike,alreadyLiked,getAllLikedOfPost} = require("../dao/likes")
const {deleteAllCommentsOfPost,addCommentOnPost,getAllCommentsOfPost} = require("../dao/comments")
const res = require("express/lib/response")

module.exports = {
    createNewPost,
    removePost,
    likePost,
    unlikePost,
    createComment,
    getPostDetails,
    getAllPostsOfUser
}


async function createNewPost(req,res){

    try{

        const {title,description} = req.body

        if(!title || !description){
            return res.status(401).send("Post cannot be created without title or description")
        }

        const postCreated = await addPost(req.user.id,title,description)

        return res.status(200).send({
            "postId": postCreated.id,
            "title": postCreated.title,
            "description": postCreated.description,
            "createdTime": new Date(postCreated.createdAt).toUTCString()
        })

    }catch(err){
        console.log("Err in creating post",err)
        return res.status(500).send("Internal Server Error")
    }

}

async function removePost(req,res){

    try{

        const id = req.params.postId

        if(!id){
            return res.status(401).send("PostId missing")
        }

        const post = await getPostById(id)

        if(!post){
            return res.status(400).send("Bad Request")
        }

        await deleteAllLikesOfPost(id)
        await deleteAllCommentsOfPost(id)
        await deletePost(id)

        return res.status(200).send("Post deleted successfully")

    }catch(err){
        console.log("Err in deleting post",err)
        return res.status(500).send("Internal Server Error")
    }


}

async function likePost(req,res){

    try{
        
        const postId = req.params.postId || req.body.id

        if(!postId){
            return res.status(401).send("PostId missing")
        }

        const post = await getPostById(postId)

        if(!post){
            return res.status(400).send("Bad Request")
        }

        const userId = req.user.id

        const isLiked = await alreadyLiked(userId,postId)

        if(isLiked){
            return res.status(200).send("already liking it")
        }

        await createLike(userId,postId)

        return res.status(200).send("Like successfull")

    }catch(err){
        console.log("Err in liking post",err)
        return res.status(500).send("Internal Server Error")
    }

}

async function unlikePost(req,res){

    try{
        
        const postId = req.params.postId || req.body.id

        if(!postId){
            return res.status(401).send("PostId missing")
        }

        const post = await getPostById(postId)

        if(!post){
            return res.status(400).send("Bad Request")
        }

        const userId = req.user.id

        const isLiked = await alreadyLiked(userId,postId)

        if(!isLiked){
            return res.status(200).send("already not liking it")
        }

        await deleteLike(userId,postId)

        return res.status(200).send("unLike successfull")

    }catch(err){
        console.log("Err in unliking post",err)
        return res.status(500).send("Internal Server Error")
    }

}

async function createComment(req,res){

    try{

        const postId = req.params.postId || req.body.id

        if(!postId){
            return res.status(401).send("PostId missing")
        }

        const post = await getPostById(postId)

        if(!post){
            return res.status(400).send("Bad Request")
        }

        const comment = req.body.comment || ""

        const createdComment = await addCommentOnPost(req.user.id,postId,comment)

        return res.status(200).send({
            "commentId": createdComment.id
        })


    }catch(err){
        console.log("Err in commenting post",err)
        return res.status(500).send("Internal Server Error")

    }

}

async function getPostDetails(req,res){

    try{

        const postId = req.params.postId

        if(!postId){
            return res.status(401).send("PostId missing")
        }

        const post = await getPostById(postId)

        if(!post){
            return res.status(400).send("Bad Request")
        }

        const noOfLikes = await getAllLikedOfPost(postId)
        const noOfComments = await getAllCommentsOfPost(postId)

        return res.status(200).send({
            "noOfLikes": noOfLikes ? noOfLikes.length : 0,
            "noOfComments": noOfComments ? noOfComments.length : 0
        })


    }catch(err){
        console.log("Err in fetching post details",err)
        return res.status(500).send("Internal Server Error")
    }

}

async function getAllPostsOfUser(req,res){

    try{

        const allPosts = await fetchAllPostsOfUser(req.user.id)

        let ans = []

        if(allPosts && allPosts.length > 0){

            for(let i = 0; i < allPosts.length; i++){

                const post = allPosts[i]

                let commentsArray = []

                if(post.PostComments){
                    for(let j = 0; j < post.PostComments.length; j++){
                        commentsArray.push(post.PostComments[j].comment)
                    }
                }

                const obj = {
                    "id": post.id,
                    "title": post.title,
                    "description": post.description,
                    "createdAt": post.createdAt,
                    "comments": commentsArray,
                    "noOfLikes": post.PostLikes ? post.PostLikes.length : 0
                }

                ans.push(obj)
            }

        }

        return res.status(200).send(ans)


    }catch(err){
        console.log("Err in fetching all posts of user",err)
        return res.status(500).send("Internal Server Error")
    }

}




