const express = require("express")
const bodyParser = require("body-parser")
var cookieParser = require('cookie-parser')
const cors = require('cors');

// const enableCORS = (req, res, next) => {
//      res.setHeader('Content-Type', 'application/json')
     
//      res.header('Access-Control-Allow-Origin', '*')
//      res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
//      res.header('Access-Control-Allow-Headers','Authorization, Content-Type, X-Request-With, X-Session-Id')

//      if(req.method === 'OPTIONS') {
//           res.status(200).send("OK")
//      } else {
//           next()
//      }
// }



const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
const whitelist = ['http://localhost:3000']
app.use(cors({
     origin: true,
     credentials: true,
     optionsSuccessStatus: 200
}))
require('./src/auth')(app)
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)






// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

