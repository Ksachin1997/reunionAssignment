const {getAllFollowers,getAllFollowings,getWhetherFollowingOrNot,followUser,unFollowUser} = require('../dao/userConnections')
const {getUserById} = require('../dao/user')

module.exports = {
    createFollowing,
    deleteFollowing,
    getUserProfile
}

async function createFollowing(req,res){

    try{

        const targetId = req.body.id || req.params.id

        if(!targetId){
            return res.status(401).send("requested userId missing")
        }

        const targetUser = await getUserById(targetId)

        if(!targetUser){
            return res.status(400).send("Bad Request")
        }

        const sourceId = req.user.id

        if(targetId === sourceId){
            return res.status(400).send("cannot follow same id")
        }

        const whetherFollowingOrNot = await getWhetherFollowingOrNot(sourceId,targetId)

        if(whetherFollowingOrNot){
            return res.status(200).send("You are already following this user")
        }

        await followUser(sourceId,targetId)

        return res.status(200).send("Follow Successfull")


    }catch(err){
        console.log("Err in following user",err)
        return res.status(500).send("Internal Server Error")
    }

}

async function deleteFollowing(req,res){

    try{

        const targetId = req.body.id || req.params.id

        if(!targetId){
            return res.status(401).send("requested userId missing")
        }

        const targetUser = await getUserById(targetId)

        if(!targetUser){
            return res.status(400).send("Bad Request")
        }

        const sourceId = req.user.id

        if(targetId === sourceId){
            return res.status(400).send("cannot unfollow same id")
        }

        const whetherFollowingOrNot = await getWhetherFollowingOrNot(sourceId,targetId)

        if(!whetherFollowingOrNot){
            return res.status(200).send("You are already not following this user")
        }

        await unFollowUser(sourceId,targetId)

        return res.status(200).send("unFollow Successfull")


    }catch(err){
        console.log("Err in unfollowing user",err)
        return res.status(500).send("Internal Server Error")
    }

}

async function getUserProfile(req,res){

    try{

        const user = req.user

        const allFollowers = await getAllFollowers(user.id)

        const allFollowings = await getAllFollowings(user.id)

        return res.status(200).send({
            "userName": user.name,
            "noOfFollowers": allFollowers ? allFollowers.length : 0,
            "noOfFollowings": allFollowings ? allFollowings.length : 0
        })


    }catch(err){
        console.log("Err in getting user profile",err)
        return res.status(500).send("Internal Server Error")
    }

}