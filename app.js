const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require('method-override')

const port = 3000
const routes = require('./routes')
require('./config/mongoose.js')

const app = express()

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})