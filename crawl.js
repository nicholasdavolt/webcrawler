const url = require('node:url')
const { JSDOM } = require('jsdom')

function normalizeURL(inputURL) {
    const parsedURL = url.parse(inputURL)

    let urlHostPath =  `${parsedURL.hostname}${parsedURL.pathname}`

    if (urlHostPath.length > 0 && urlHostPath.slice(-1) === '/') {
        urlHostPath = urlHostPath.slice(0, -1)
    }

    return urlHostPath
}

function getURLsFromHTML (htmlBody, baseUrl) {
    let urls = []
    const dom = new JSDOM(htmlBody)

    let aTags = dom.window.document.querySelectorAll('a')

    for (const tag of aTags) {
        if (tag.href.slice(0,1) === "/") {
            try {
                let absolute = new URL(tag.href,baseUrl)

                urls.push(absolute.href)
            }catch(err) {
                console.log(`${err.message}: ${tag.href}`)
            }
        }
        else {
            try {
                urls.push(tag.href)
            }
            catch(err){
                console.log(`${err.message}: ${tag.href}`)
            }
        }
    }

    


    return urls
}

async function crawlPage(currentURL) {
    
    try {
        const res = await fetch(currentURL)
        if (res.status > 399) {
            console.log(`HTTP error, code ${res.status}`)
            return
        }
        const contentType = res.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Non-html response: ${contentType}`)
            return
        }

        console.log(await res.text())
        
           
        
    } catch(err) {
        console.log(err.message)
    }

    

    
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage    
}