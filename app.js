const express = require('express')
const app = express()
const {MONGOURI} = require('./keys')
const mongoose = require('mongoose')
const router = require('./routes')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.set('view engine', 'ejs')
app.use('/contacts', router)

app.get('/', (req,res) => {
    res.json({message: "WELCOME"})
})
const PORT = process.env.PORT||8000

mongoose
.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch(e => {
    console.log(e);
})


