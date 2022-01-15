const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRoute = require("./controllers/user");
const app = express()
const port = process.env.PORT
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "200mb" }));

app.use("/api/authenticate",loginRoute)

app.listen(port, () => {
    console.log("App listening on port 4000")
})

// const db = require('./models')
// const bcrypt = require("bcrypt");

// app.get('/populateMockData', async (req,res) => {


//     const users = await db.User.findAll()

//     for(let i=0;i<users.length;i++){

//         //const password = await bcrypt.hash(`user${i}@123`,10)

//         for(let j=1;j<4;j++){

//             await db.Post.create({
//                 title: `title ${users[i].id} ${j}`,
//                 description: `desc ${users[i].id} ${j} by ${users[i].name}`,
//                 userId: `${users[i].id}`
//             })

//         }

//         // await db.User.create({

//         //     name: `User ${i}`,
//         //     email: `sachinlaish+${i}@gmail.com`,
//         //     password: password,
//         //     phone: "7355654862"
    
//         // })


//     }

//     res.send(users)
// })