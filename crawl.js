const url = require('node:url')
const { JSDOM } = require('jsdom')

function normalizeURL(inputURL) {
    const parsedURL = new URL(inputURL)

    let urlHostPath =  `${parsedURL.host}${parsedURL.pathname}`

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

async function crawlPage(baseURL, currentURL, pages) {

    const currentURLObj = new URL(currentURL)
    const baseURLObj = new URL(baseURL)

    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)

    if (normalizedCurrentURL in pages) {
        pages[normalizedCurrentURL]++
        return pages
    }
    else {
        pages[normalizedCurrentURL] = 1
    }

    console.log(`Crawling ${currentURL}`)
    let htmlBody = ''
    
    try {
        const res = await fetch(currentURL)
        if (res.status > 399) {
            console.log(`HTTP error, code ${res.status}`)
            return pages
        }
        const contentType = res.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Non-html response: ${contentType}`)
            return pages
        }

        htmlBody = await res.text()

        

        
        
           
        
    } catch(err) {
        console.log(err.message)
    }

    

        const collectedURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const item of collectedURLs) {
            pages = await crawlPage(baseURL, item, pages)
        }
        

        return pages

    

    
}

module.exports = {
    crawlPage,
    normalizeURL,
    getURLsFromHTML,
        
}