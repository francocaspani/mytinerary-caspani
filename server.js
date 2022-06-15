require('dotenv').config()
require('./config/database')
const express = require('express')
const Router = require('./routes/routes')
const cors = require('cors')

const app = express()
const PORT = 4000
app.use(express.json())
app.use(cors())
app.use('/api', Router)

app.set('port', PORT)

app.get('/', (req,res) => {
    res.send('Servidor CREADO y corriendo en puerto ' + app.get('port'))
})

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en puerto' + PORT)
})