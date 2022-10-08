//require('./server.js')
const winamaxScrapper = require('./winamaxScrapper')
const fdjScrapper = require('./fdjScrapper')
const betclicScrapper = require('./betclicScrapper')
const unibetScrapper = require('./unibetScrapper')
var stringSimilarity = require("string-similarity");
const {compare, estimate} = require("./estimator");
const budget= 100

const findClosestObject = (originalObject, listToSearch) =>{
    const listOfDistance = listToSearch.map(e=>stringSimilarity.compareTwoStrings(
        (originalObject.team1+' - '+ originalObject.team2).toUpperCase(),(e.team1+' - '+ e.team2).toUpperCase()
    ))
    const closestScore=Math.max(...listOfDistance)
    return(listToSearch[listOfDistance.indexOf(closestScore)])

}

const  main = async () =>{
    console.log("hello")
// Appel de la fonction getData() et affichage des données
    console.log("loading winamax odds")
    const winamaxResult = await winamaxScrapper.getData()

    console.log("loading fdj odds")
    const fdjResult = await fdjScrapper.getData()
    console.log("loading betclic odds")
    const betclicResult = await betclicScrapper.getData()
    console.log("loading unibet odds")
    const unibetResult = await unibetScrapper.getData()


    console.log("comparing")
    const minLength= Math.min(winamaxResult.length,fdjResult.length, betclicResult.length)
    for(let i = 0; i<minLength;i++){
        console.log(winamaxResult[i].team1+' - '+ winamaxResult[i].team2)
        const fdjClosestObject = findClosestObject(winamaxResult[i],fdjResult)
        const betclicClosestObject = findClosestObject(winamaxResult[i], fdjResult)
        const unibetClosestObject = findClosestObject(winamaxResult[i], unibetResult)
        const list = [winamaxResult[i],fdjClosestObject, betclicClosestObject, unibetClosestObject]
        const comparaison = compare(list)

        if(comparaison<1){
            const estimation = estimate(list, comparaison, budget)
            console.log(`Arbitrage betting detected, bet as followed for ${budget}€ budget`)
            console.log(JSON.stringify(estimation))
        }
        else{
            console.log("no arbitrage betting available")
            console.log("result was "+ comparaison)
        }
    }

}

main()