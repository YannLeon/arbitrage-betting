//require('./server.js')
const winamaxScrapper = require('./winamaxScrapper')
const fdjScrapper = require('./fdjScrapper')



const  main = async () =>{
    console.log("hello")
// Appel de la fonction getData() et affichage des données
    console.log("loading winamax odds")
    const winamaxResult = await winamaxScrapper.getData()
    console.log(winamaxResult)
    console.log("loading fdj odds")
    const fdjResult = await fdjScrapper.getData()
    console.log(fdjResult)
}

main()