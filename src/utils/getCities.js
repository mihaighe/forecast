const geocode = require('./geocode')
const forecast = require('./forecast')

const getCities = () => {
    capitalArray = ['Amsterdam', 'Andorra la Vella', 'Athens', 'Belgrade', 'Berlin', 'Bern', 'Bratislava', 'Brussels', 'Bucharest', 'Budapest', 'Chisinau', 
    'Copenhagen', 'Dublin', 'Helsinki', 'Kiev', 'Lisbon', 'Ljubljana', 'London', 'Luxembourg', 'Madrid', 'Minsk', 'Monaco', 'Moscow', 'Nicosia', 'Oslo', 'Paris',
    'Podgorica', 'Prague', 'Reykjavik', 'Riga', 'Rome', 'Sarajevo', 'Skopje', 'Sofia', 'Stockholm', 'Tallinn', 'Tirana', 'Vaduz', 'Valletta', 'Vatican', 'Vienna', 
    'Vilnius', 'Warsaw', 'Zagreb']

    countryArray = ['Netherlands', 'Andorra', 'Greece', 'Serbia', 'Germany', 'Switzerland', 'Slovakia', 'Belgium', 'Romania', 'Hungary', 'Moldova', 
    'Denmark', 'Ireland', 'Finland', 'Ukraine', 'Portugal', 'Slovenia', 'United Kingdom', 'Luxembourg', 'Spain', 'Belarus', 'Monaco', 'Russia', 'Cyprus', 'Norway', 
    'France', 'Montenegro', 'Czech Republic', 'Iceland', 'Latvia', 'Italy', 'Bosnia', 'Macedonia', 'Bulgaria', 'Sweden', 'Estonia', 'Albania', 'Liechtenstein', 
    'Malta', 'Holy See', 'Austria', 'Lithuania', 'Poland', 'Croatia']

    dataArray = []
    capitalArray.forEach((capital, index) => {
        geocode(capital, (error, { longitude, latitude, location } = {}) => {
            forecast(longitude, latitude, (error, { temperatureHigh, temperatureLow }) => {
                dataArray.push({
                    "id": index,
                    "country": countryArray[index],
                    "capital": capital,
                    "latitude": latitude.toFixed(2),
                    "longitude": longitude.toFixed(2),
                    "forecast": 'Highest: ' + Math.round(temperatureHigh) + '°C Lowest: '+  Math.round(temperatureLow) + '°C'
                })
            })
        })
    })

    return dataArray
}

module.exports = getCities