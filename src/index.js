const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const tripRouter = require('./routers/trip')
const stopRouter = require('./routers/stop')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(tripRouter)
app.use(stopRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})