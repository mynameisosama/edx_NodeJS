module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.posts)
    },
    addPost(req, res) {
        let newPost = req.body
        req.store.posts.push(newPost)
        res.status(201).send('Added Post\n')
    },
    updatePost(req, res) {
        req.store.posts[req.params.postId] = req.body
        res.status(200).send(`Updated Post ${req.params.postId}\n`)
    },
    removePost(req, res) {
        req.store.posts.splice(req.params.postId, 1)
        res.status(204).send(`Removed Post ${req.params.postId}\n`)
    }
}