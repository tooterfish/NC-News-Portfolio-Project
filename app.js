const express = require('express')
const { getArticle, getArticles, getCommentsByArticle, postCommentOnArticle, patchArticleVotes } = require('./controllers/articles-controllers')
const { getTopics } = require('./controllers/topics-controllers')
const { getUsers } = require('./controllers/users-controllers')
const { deleteComment } = require('./controllers/comments-controllers')
const { handleErrors } = require('./controllers/error-controllers')


const app = express()

app.use(express.json())

app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticle)
app.patch('/api/articles/:article_id', patchArticleVotes)
app.get('/api/articles/:article_id/comments', getCommentsByArticle)
app.post('/api/articles/:article_id/comments', postCommentOnArticle)
app.get('/api/users', getUsers)
app.delete('/api/comments/:comment_id', deleteComment)

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'page not found' })
})

app.use(handleErrors)

module.exports = app