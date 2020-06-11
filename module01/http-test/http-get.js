const http = require('http')
const url = 'http://nodeprogram.com'

http.get(url, (response) => {
    let rawData = ''
    let c = 0
    response.on('data', (chunk) => {
        rawData += chunk
        c++
    })
    response.on('end', () => {
        console.log(rawData, c)
    })
    response.on('error', (error) => {
        console.error(`Got inner error: ${error.message}`)
    })
}).on('error', (error) => {
    console.error(`Got error: ${error.message}`)
})