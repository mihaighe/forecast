const weatherForm = document.querySelector('#weather-form')
const coordinatesForm = document.querySelector('#coordinates-form')

const weatherLocation = document.querySelector('#weather-input')
const coordinatesLocation = document.querySelector('#coordinates-input')

const weatherMessageOne = document.querySelector('#weather-message-1')
const weatherMessageTwo = document.querySelector('#weather-message-2')

const coordinatesMessageOne = document.querySelector('#coordinates-message-1')
const coordinatesMessageTwo = document.querySelector('#coordinates-message-2')

const geolocationButton = document.querySelector('#geolocation-button')
const geolocationMessage = document.querySelector('#geolocation-message')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = weatherLocation.value

    weatherMessageOne.textContent = 'Loading...'
    weatherMessageTwo.textContent = ''

    fetch('/weather?selector=weather&address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherMessageOne.textContent = data.error
            } else {
                weatherMessageOne.textContent = data.location
                weatherMessageTwo.textContent = data.forecast
            }
        })
    })
})
coordinatesForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = coordinatesLocation.value

    coordinatesMessageOne.textContent = 'Loading...'
    coordinatesMessageTwo.textContent = ''

    fetch('/weather?selector=coordinates&address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                coordinatesMessageOne.textContent = data.error
            } else {
                coordinatesMessageOne.textContent = data.location
                coordinatesMessageTwo.textContent = `Longitude: ${data.longitude} Latitude: ${data.latitude}`
            }
        })
    })
})

geolocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        url = `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
        geolocationMessage.textContent = 'My Current Location'
        geolocationMessage.href = url
    })
})
