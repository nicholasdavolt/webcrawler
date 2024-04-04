const url = require('node:url')

function normalizeURL(inputURL) {
    const parsedURL = url.parse(inputURL)

    let urlHostPath =  `${parsedURL.hostname}${parsedURL.pathname}`

    if (urlHostPath.length > 0 && urlHostPath.slice(-1) === '/') {
        urlHostPath = urlHostPath.slice(0, -1)
    }

    return urlHostPath
}


module.exports = {
    normalizeURL
}