const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true }) //connect to MongoDB

const db  = mongoose.connection
db.on('error',()=>{
    console.log('mongodb error')
})

db.once('open', ()=>{
    console.log('mongodb connected!')
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})