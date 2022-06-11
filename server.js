const express = require('express')
const app = express()

const PORT = 4000
const hola = 20
app.set('port', PORT)
app.set('hola', hola)

app.get('/', (req,res) => {
    res.send('Servidor CREADO y corriendo en puerto ' + app.get('port'))
})

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en puerto' + PORT)
})