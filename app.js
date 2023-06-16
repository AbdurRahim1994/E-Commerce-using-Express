const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { readdirSync } = require('fs')

//Security middleware import
const cors = require('cors');
const expressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const hpp = require('hpp')
const xssClean = require('xss-clean')

//Security middleware implement
app.use(cors())
app.use(expressMongoSanitize())
app.use(helmet())
app.use(hpp())
app.use(xssClean())

//Body parser implement
const bodyParser = require('body-parser');
app.use(bodyParser.json())

//Rate limit implement
const expressRateLimit = require('express-rate-limit')
const limiter = expressRateLimit({
    windowMs: 1000 * 60 * 15,
    max: 3000
})

app.use(limiter)

//Configure REST API JSON Size
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))

//Route configuration
readdirSync('./src/routes').map((file) => app.use('/api/v1', require(`./src/routes/${file}`)));

//Database connection
const URI = 'mongodb+srv://AbdurRahim:<password>@cluster0.qooqrpl.mongodb.net/E-Commerce?retryWrites=true&w=majority'
const Option = { user: 'AbdurRahim', pass: 'up3UWfVQsKvmUpC7' }
mongoose.connect(URI, Option)
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((error) => {
        console.log("Database connection failed");
    })

//Invalid API
app.use('*', (req, res) => {
    res.status(404).json({ message: "Failed", data: "Not Found" })
})

module.exports = app;