//require('./server.js')
const winamaxScrapper = require('./winamaxScrapper')
const fdjScrapper = require('./fdjScrapper')
var stringSimilarity = require("string-similarity");
const {compare, estimate} = require("./estimator");
const budget= 100


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
        const fdjClosest = fdjResult.map(e=>stringSimilarity.compareTwoStrings((winamaxResult[i].team1+' - '+ winamaxResult[i].team2).toUpperCase(),(e.team1+' - '+ e.team2).toUpperCase()))
        const fdjMax = Math.max(...fdjClosest)
        //console.log(fdjMax)
        const fdjMaxObject = fdjResult[fdjClosest.indexOf(fdjMax)]
        //console.log(fdjMaxObject.team1+" - "+fdjMaxObject.team2)
        const list = [winamaxResult[i],fdjResult[fdjClosest.indexOf(fdjMax)]]
        const comparaison = compare(list)

        if(comparaison<1){
            const estimation = estimate(list, comparaison, budget)
            console.log(`Arbitrage betting detected, bet as followed for ${budget}€ budget`)
            console.log(JSON.stringify(estimation))
        }
        else{
            console.log("no arbitrage betting available")
        }
    }

}

main()