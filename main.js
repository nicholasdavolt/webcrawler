
function main(){

    const { argv } = require('node:process')
    const { crawlPage } = require('./crawl.js') 
    
    if (argv.length < 3) {
        console.log('No argument passed to program')
    }
    else if (argv.length > 3) {
        console.log ('Too many arguments')
    }
    else {console.log(`Beginning crawl with ${argv[2]}`)}

    crawlPage(argv[2])


    

    
}


main()