const express = require('express')
const router = express.Router()

const posts = require('./posts');
const comments = require('./comments');

router.get('/posts', posts.getPosts)
router.post('/posts', posts.addPost)
router.put('/posts/:postId', posts.updatePost)
router.delete('/posts/:postId', posts.removePost)

router.get('/posts/:postId/comments', comments.getComments)
router.post('/posts/:postId/comments', comments.addComment)
router.put('/posts/:postId/comments/:commentId', comments.updateComment)
router.delete('/posts/:postId/comments/:commentId', comments.removeComment)

router.get('/', (req, res, next) => {
    res.status(200).send('blog')
})

module.exports = router