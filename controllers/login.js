const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
   const user = await User.findOne({username: request.body.username})
    const passwordCorrect = user === null? false : await bcrypt.compare(request.body.password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    else{
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send({token, username: user.username, _id: user._id, bio: user.bio, pic: user.pic})}
});

module.exports = loginRouter