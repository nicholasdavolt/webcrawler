const { crawlPage } = require('./crawl.js') 
const { printReport } = require ('./report.js')

async function main(){

    const { argv } = require('node:process')
    
    
    if (argv.length < 3) {
        console.log('No argument passed to program')
    }
    if (argv.length > 3) {
        console.log ('Too many arguments')
    }
    

    const currentURL = argv[2]
    

    const pages = await crawlPage(currentURL, currentURL, {})

    printReport(pages)


    

    
}


main()