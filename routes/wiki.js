const express = require('express')
const wikiRouter = express.Router()
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')
const { Page } = require('../models')

wikiRouter.get('/', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      title: req.body.title,
      content: req.body.content,
    })
    res.send(wikiPage(page))
  } catch (error) {
    next(error)
  }
})

wikiRouter.get('/add', (req, res, next) => {
  try {
    res.send(addPage())
  } catch (error) {
    next(error)
  }
})

wikiRouter.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    })
    console.log(page)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = wikiRouter
