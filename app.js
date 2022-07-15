const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true }) //connect to MongoDB

const db  = mongoose.connection
db.on('error',()=>{
    console.log('mongodb error')
})

db.once('open', ()=>{
    console.log('mongodb connected!')
})

app.get('/',(req,res)=>{
    res.send('HELLO WORLD')
})

app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})