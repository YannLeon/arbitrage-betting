//require('./server.js')
const winamaxScrapper = require('./winamaxScrapper')



const  main = async () =>{
    console.log("hello")
// Appel de la fonction getData() et affichage des données
    const winamaxResult = await winamaxScrapper.getData()
    console.log(winamaxResult)
}

main()