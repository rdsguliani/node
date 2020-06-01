
const express = require('express');

const feedController = require('../controllers/feed')

const { body } = require('express-validator');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post('/post', 
                [
                    body('title')
                    .trim()
                    .isLength({min: 7}),
                    body('content')
                    .trim()
                    .isLength({min: 5})
                    
                ],
            feedController.createPosts);

router.get('/posts/:postId', feedController.getPostById);

router.put('/post/:postId', feedController.updateFeed);

router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
