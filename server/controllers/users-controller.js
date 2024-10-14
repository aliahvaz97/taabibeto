const UsersModel = require("../models/users_model")

const getUser = (req,res) => {
    UsersModel.getUser(parseInt(req.params.id)).then((result) =>{
    
    if (!result) res.status(404).send("user with given id not fund")
    res.send(result);
})
}

module.exports =
 {
    getUser
    
 }