const { fetchArticle, fetchArticles, fetchCommentsByArticle, createComment, updateArticleVotes, createArticle } = require('../models/articles-models')

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params
  fetchArticle(article_id)
  .then((article) => {
    res.status(200).send({ article })
  })
  .catch((err) => {
    next(err)
  })
}

exports.postArticle = (req, res, next) => {
  const { author, title, body, topic, article_img_url } = req.body
  createArticle(author, title, body, topic, article_img_url)
  .then((article) => {
    res.status(201).send({ article })
  })
  .catch((err) => {
    next(err)
  })
}

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order, limit } = req.query
  fetchArticles(topic, sort_by, order, limit)
  .then((articles) => {
    res.status(200).send({ articles })
  })
  .catch((err) => {
    next(err)
  })
}

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params
  fetchCommentsByArticle(article_id)
  .then((comments) => {
    res.status(200).send({ comments })
  })
  .catch((err) => {
    next(err)
  })
}

exports.postCommentOnArticle = (req, res, next) => {
  const { article_id } = req.params
  const { username, body } = req.body
  createComment(article_id, username, body)
  .then((comment) => {
    res.status(201).send({ comment })
  })
  .catch((err) => {
    next(err)
  })
}

exports.patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params
  const { inc_votes } = req.body
  updateArticleVotes(article_id, inc_votes)
  .then((article) => {
    res.status(200).send({ article })
  })
  .catch((err) => {
    next(err)
  })
}