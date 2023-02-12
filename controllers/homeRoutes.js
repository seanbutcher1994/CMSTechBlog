const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const auth = require('../utils/auth')

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
});

router.get('/user/:id', /* auth */ async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content']
                },
            ],
        });
        const user = userData.get({ plain: true });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;