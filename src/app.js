const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const getCities = require('./utils/getCities')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mihai Ghe'
    })
})

app.get('/cities', (req, res) => {
    cities = getCities()

    setTimeout(function(){
        res.render('cities', {
            cities,
            title: 'Cities',
            name: 'Mihai Ghe'
        })
        console.log(cities.length)
    }, 5000)

})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Application deployed!',
        title: 'Help',
        name: 'Mihai Ghe',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    if (req.query.selector == 'weather') {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(longitude, latitude, (error, { summary, temperature, precipProbability, temperatureHigh, temperatureLow }) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: summary + ' It is currently ' 
                        + Math.round(temperature) + '°C out. There is a ' 
                        + Math.round(precipProbability) + '% chance of rain. The highest value of the day is ' 
                        + Math.round(temperatureHigh) + '°C with the lowest of ' 
                        + Math.round(temperatureLow) + '°C',
                    location,
                    address: req.query.address
                })
            })
        })
    } else if (req.query.selector == 'coordinates') {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                longitude, latitude, location
            })
        })
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mihai Ghe',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) 