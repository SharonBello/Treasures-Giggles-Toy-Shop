const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const toyService = require('./services/toy.service.js')

const app = express()
const http = require('http').createServer(app)

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const toyRoutes = require('./api/toy/toy.routes')
const reviewRoutes = require('./api/review/review.routes')
const {setupSocketAPI} = require('./services/socket.service')

const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

// routes
app.use('/api/review', reviewRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)
setupSocketAPI(http)

app.post('/api/toy', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot add toy')

    const toy = req.body
    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
})

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const logger = require('./services/logger.service')

const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

