const express = require('express')
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')

const { indexRouter } = require('./routes/api/index')
const { signupRouter } = require('./routes/api/signup')
const { dataRouter } = require('./routes/api/data')
const { refreshAccessTokenRouter } = require('./routes/api/refreshAccessToken')

const { auth } = require('./middlewares/auth')

const app = express()
dotenv.config()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    
    next()
})

app.use(express.json())

app.use(cookieParser())

app.use(auth) // sets user on the request if token is present and valid
app.use(refreshAccessTokenRouter)

app.use(indexRouter)
app.use(signupRouter)
app.use(dataRouter)

app.listen(5000, () => console.log('Server started on 5000'))