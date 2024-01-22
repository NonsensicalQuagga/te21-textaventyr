const express = require('express')
const router = express.Router()

const story = require('../data/story.json')

router.get('/', function (req, res) {
  console.log(story.parts[0])
  res.render('index.njk', { username: req.session.username, title: 'Welcome', part: story.parts[0] })
})
router.post('/username', function(req, res){
  req.session.username = req.body.username
  console.log(req.session.username)
  res.redirect('/story/0')
})

router.get('/story/:id', function (req, res) {
  let part = story.parts.find((part) => part.id === parseInt(req.params.id))
  if (!part) {
    res.status(404).render('404.njk', { title: '404' })
    return
  }

  let replace = part.name.replace('[PLAYER]', req.session.username)
  part = {... part, name: replace}

  replace = part.text.replace('[PLAYER]', req.session.username)
  part = {... part, text: replace}

  res.render('part.njk', { title: part.name, part: part})
})

router.get('/418', function (req, res) {
  res.status(418).render('418.njk', {title: '418' })
  // res.status(418)
})

module.exports = router
