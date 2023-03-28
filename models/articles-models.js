const db = require('../db/connection')

exports.fetchArticle = (articleId) => {
  return db.query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
  .then((result) => {
    if (result.rows[0]) { return result.rows[0] }
    else { return Promise.reject({ status:404, msg: 'article not found' }) }
  }
)}

exports.fetchArticles = () => {
  const queryStr = `
  SELECT articles.*, COUNT(comment_id)::int AS comment_count FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY created_at DESC
  `
  return db.query(queryStr).then((result) => {
    console.log(result.rows)
    return result.rows
  })
}
