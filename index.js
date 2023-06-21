
//importing the packages
const express = require('express')



//importing of the modules
const connectToMongo = require('./db')

//Express setup variables
const app = express()
const port = 3000

//function call for connection to mongoDB
connectToMongo();

//using middleware -> to enable json 
app.use(express.json())

//Server routing function starts here.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//available routes

//Authentication Route
app.use('/api/auth', require('./routes/auth.js'))

//Notes Route
app.use('/api/notes', require('./routes/notesroute.js'))



//function for invoking the server listening function.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

