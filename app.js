const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views')
const layout = require('./views/layout')
const { db, Page, User } = require('./models')
const usersRouter = require('./routes/users')
const wikiRouter = require('./routes/wiki')

async function syncFunction() {
  await Page.sync()
  await User.sync()
  app.listen(process.env.PORT || 3000, function () {
  });
  console.log(db)
}

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'Public')))

app.use('/users', usersRouter)
app.use('/wiki', wikiRouter)

app.get('/', (req, res, next) => {
  try {
    res.redirect('/wiki')
  } catch (error) {
    next(error)
  }
})

syncFunction()
