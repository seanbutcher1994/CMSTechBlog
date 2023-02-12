const router = require('express').Router();
const { User, Post } = require('../models');
const auth = require('../utils/auth');

router.get('/edit/:id', /* auth, */ async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributres: ['name', 'id']
                },
            ],
        });
        const post = postData.get ({ plain: true });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;