const {getUserByEmail} = require('../dao/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports = {
    loginUser
}

async function loginUser(req, res){

    try{

        const {email, password} = req.body

        if(!email || !password){
            return res.status(401).send("email or password missing in req body")
        }

        const user = await getUserByEmail(email)

        if(!user){
            return res.status(400).send("wrong credentials")
        }

        const validPassword = await bcrypt.compare(password,user.password)

        if (!validPassword) return res.status(400).send("wrong credentials");

        const token = jwt.sign(user.id, process.env.jwtPrivateKey);

        return res.status(200).send({
            "x-auth-token": token
        });


    }catch(err){
        console.log("Err in login user",err)
        return res.status(500).send("Internal Server Error")
    }

}