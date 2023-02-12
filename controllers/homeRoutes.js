const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

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
})

module.exports = router;