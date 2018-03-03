const Router = require('express').Router
const Events = require('./model')
const router = new Router()

router.get('/events', (request, response) => {
  console.log(Events)
  Events.findAll()
    .then(result => {
      response.send( result )
    })
    .catch(err => {
      response.code(404)
      response.send( { message: 'Sorry, it seems to be boring in A\'dam!' })
    })
})

module.exports = router
