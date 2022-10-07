//require('./server.js')
const winamaxScrapper = require('./winamaxScrapper')
const fdjScrapper = require('./fdjScrapper')
var stringSimilarity = require("string-similarity");
const {compare} = require("./estimator");



const  main = async () =>{
    console.log("hello")
// Appel de la fonction getData() et affichage des données
    console.log("loading winamax odds")
    const winamaxResult = await winamaxScrapper.getData()
    //console.log(winamaxResult)
    console.log("loading fdj odds")
    const fdjResult = await fdjScrapper.getData()
    //console.log(fdjResult)
    console.log("comparing")
    const minLength= Math.min(winamaxResult.length,fdjResult.length)
    for(let i = 0; i<minLength;i++){
        console.log(winamaxResult[i].team1+' - '+ winamaxResult[i].team2)
        console.log(compare([winamaxResult[i],fdjResult[i]]))
    }

}

main()