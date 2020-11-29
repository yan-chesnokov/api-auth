const express = require('express')
const app = express()

//import router
const autchRoute = require('./router/autch')
app.use('api/user',autchRoute)

app.listen(3000, () => console.log("Server Up and ranning 3000"))
