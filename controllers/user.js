const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const getTokenFrom = require('../tools/getTokenFrom');
const jwt = require('jsonwebtoken');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('posts', { content: 1, date: 1, goal: 1 });
    response.json(users);
});
userRouter.get('/:id', async (request, response) => {
    const  user = await User.findById(request.params.id).populate('posts', { content: 1, date: 1, goal:1 });
    response.json(user);
});

userRouter.post('/', async (request, response) => {
    const body = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
        username: body.username,
        passwordHash:passwordHash,
    });

    const savedUser=user.save(function(err){
        if(err){
            console.log(err);
            return response.status(400).json({error:'already exists'});
        }
        response.status(201).json(savedUser)
    });

    ;}
);

userRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const user = {
        profilePicture: body.profilePicture,
        bio: body.bio
    };
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    try{
        await User.findByIdAndUpdate(request.params.id, user);
        response.status(200).json(user);
    }
    catch(exception){
        console.log(exception);
        response.status(400).json({error:'something went wrong'});
    }
});

module.exports = userRouter;


