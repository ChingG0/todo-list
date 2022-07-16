const express = require("express")
const mongoose = require("mongoose")

const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")

const Todo = require("./models/todo")

const port = 3000
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

app.get("/", (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => res.render("index", { todos }))
    .catch((err) => {
      console.error(err)
    })
})

app.get("/todos/new", (req, res) => {
  return res.render("new")
})

app.post("/todos", (req, res) => {
  const name = req.body.name

  return Todo.create({ name })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err))
})

app.get("/todos/:id", (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render("detail", { todo }))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
