const Router = require('express').Router
const Events = require('./model')
const router = new Router()

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const today = new Date().toISOString().slice(0,10);

router.get('/events', (request, response) => {
  Events.findAll({
    attributes: ['title', 'start_date', 'end_date' ],
    where: {
      start_date : {
        [Op.gte]: today
      }
    }
  })
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

router.post('/events', (request, response) => {
  const event = request.body
  console.log(event.start_date)
  if (event.start_date >= today && event.end_date >= event.start_date) {
    Events.create(event)
    .then(entity => {
      response.status(201).send(entity)
    })
    .catch(error => {
      response.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
  }
  else if (event.start_date < today) {
    response.send({
      message: 'The event needs to be in the future'
    })
  }
  else {
    response.send({
      message: 'The end date can\'t be before the start date'
    })
  }
})

router.delete('/events/:id', (request, response) => {
  const eventId = Number(request.params.id)
  Events.findById(request.params.id)
  .then(entity => {
    return entity.destroy()
  })
  .then(_ => {
    response.send({
      message: 'The event was deleted succesfully'
    })
  })
  .catch(error => {
    response.status(500).send({
      message: `Something went wrong`,
      error
    })
  })
})

router.put('/events/:id', (request, response) => {
  const eventId = Number(request.params.id)
  const updates = request.body
  Events.findById(request.params.id)
  .then(entity => {
    return entity.update(updates)
  })
  .then(_ => {
    response.send({
      message: 'The event was updated succesfully'
    })
  })
  .catch(error => {
    response.status(500).send({
      message: `Something went wrong`,
      error
    })
  })
})

module.exports = router
