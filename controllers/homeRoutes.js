const router = require('express').Router();
// const User = require('../models/User');
// const Post = require('../models/Post');
// const Comment = require('../models/Comment');

const { User, Post, Comment } = require('../models')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
            ],
        });
        res.status(200).json(postData)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    },
                },
            ],
        });
        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;