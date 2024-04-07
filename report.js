function printReport(pages) {

    console.log('Generating Report...')

    const sortedPages = sortPages(pages)

    for (const page of sortedPages) {
        const key = page[0]
        const value = page[1]

        console.log(`Found ${value} internal links to ${key}`)
    }

    

    

    

    
}


function sortPages(pages) {

    const pagesArr = Object.entries(pages)

    pagesArr.sort((a, b) => b[1] - a[1])

    return pagesArr

    

}

module.exports = {
    printReport,
    
}