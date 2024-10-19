const UsersModel = require("../models/users_model")

const getUser = (req,res) => {
    UsersModel.getUser(parseInt(req.params.id)).then((result) =>{
    
    if (!result) res.status(404).send("user with given id not fund")
    res.send(result);
})
}

const insertUser = (req,res) => {
    if (!req.body.name || req.body.name.length < 3)
        {
            res.status(400).send("name is required")
            return
        }
    UsersModel.insertUser(req.body.name,req.body.number).then((result)=>{
        res.send(result)
    })
}

module.exports =
 {
    getUser,
    insertUser
 }