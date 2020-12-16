const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ea7d5fe255a3ad0c9eddbd2c704c8b50/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Invalid coordonates. Try another search', undefined)
        } else {
            const { temperature, precipProbability } = body.currently
            const { summary, temperatureHigh, temperatureLow } = body.daily.data[0]
            callback(undefined, {summary, temperature, precipProbability, temperatureHigh, temperatureLow })
        }
    })
}

module.exports = forecast