const postRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../tools/getTokenFrom')
const Post = require('../models/post')
const User = require('../models/user')

postRouter.get('/', (request, response) => {
    Post.find({}).then(posts => {
        response.json(posts)
    })
})

postRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const user = await User.findById(decodedToken.id)

    const post = new Post({
        content: body.content,
        date: new Date(),
        user: user._id
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()
    response.status(201).json(savedPost)
    })

module.exports = postRouter