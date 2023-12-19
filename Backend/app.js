

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/alien', (req, res) => {
    res.send('Hello Alien')
})

app.get('/alien/:id', (req, res) => {
    res.send('Hello Alien' + req.params.id)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})