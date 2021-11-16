const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
connectToMongo(); //connecting to ongo


const app = express() //declaring the app
const port = 8000 //declaring the port
app.use(cors())
app.use(express.json())
//Avialable Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})


/*
BASIC EXPRESS BOILER PLATE

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
 */