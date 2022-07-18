const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require('method-override')

const Todo = require("./models/todo")

const port = 3000

const routes = require('./routes')
const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) //connect to MongoDB

const db = mongoose.connection
db.on("error", () => {
  console.log("mongodb error")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
