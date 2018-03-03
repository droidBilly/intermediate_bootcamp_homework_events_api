const Router = require('express').Router
const Events = require('./model')
const router = new Router()

router.get('/events', (request, response) => {
  Events.findAll()
    .then(result => {
      response.send( result )
    })
    .catch(err => {
      response.code(404)
      response.send( { message: 'Sorry, it seems to be boring in A\'dam!' })
    })
})

router.get('/events/:id', (request, response) => {
  const eventId = request.params.id
  Events.findById(eventId).then(event => {
    if (event) {
      response.send(event)
    }
    else {
      response.status(404)
      response.json ({ message: "Sorry, no event with this id!"})
    }
  })
})

router.post('/events', (req, res) => {
  const event = req.body
  Events.create(event).then(entity => {
    res.status(201).send(entity)
  })
})

module.exports = router
