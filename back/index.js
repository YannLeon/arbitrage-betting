//require('./server.js')
const winamaxScrapper = require('./Scappers/winamaxScrapper')
const fdjScrapper = require('./Scappers/fdjScrapper')
const betclicScrapper = require('./Scappers/betclicScrapper')
const unibetScrapper = require('./Scappers/unibetScrapper')
const bwinScrapper = require('./Scappers/bwinScrapper')
const pokerStarsScrapper = require('./Scappers/pokerStarsScrapper')
var stringSimilarity = require("string-similarity");
const data = require ("./data.json")
const {compare, estimate} = require("./estimator");
const budget= 100

const findClosestObject = (originalObject, listToSearch) =>{
    const listOfDistance = listToSearch.map(e=>stringSimilarity.compareTwoStrings(
        (originalObject.team1+' - '+ originalObject.team2).toUpperCase(),(e.team1+' - '+ e.team2).toUpperCase()
    ))
    const closestScore=Math.max(...listOfDistance)
    if(closestScore>0.7) {
        return (listToSearch[listOfDistance.indexOf(closestScore)])
    }
    else return null

}
const estimateForLeague = async(league) =>{
    // Appel de la fonction getData() et affichage des données
    console.log("ESTIMATION FOR "+league)
    console.log("loading winamax odds")
    const winamaxResult = await winamaxScrapper.getData(league)

    console.log("loading fdj odds")
    const fdjResult = await fdjScrapper.getData(league)
    console.log("loading betclic odds")
    const betclicResult = await betclicScrapper.getData(league)
    console.log("loading unibet odds")
    const unibetResult = await unibetScrapper.getData(league)
    console.log("loading pokerStars odds")
    const pokerStarsResult = await pokerStarsScrapper.getData(league)
    console.log("loading bwin odds")
    const bwinResult = await bwinScrapper.getData(league)

    console.log("comparing")
    const minLength= Math.min(winamaxResult.length,fdjResult.length, betclicResult.length, unibetResult.length,
        pokerStarsResult.length, bwinResult.length)
    for(let i = 0; i<minLength;i++){
        console.log(winamaxResult[i].team1+' - '+ winamaxResult[i].team2)
        const fdjClosestObject = findClosestObject(winamaxResult[i],fdjResult)
        const betclicClosestObject = findClosestObject(winamaxResult[i], fdjResult)
        const unibetClosestObject = findClosestObject(winamaxResult[i], unibetResult)
        const pokerStarsClosestObject = findClosestObject(winamaxResult[i],pokerStarsResult)
        const bwinClosestObject = findClosestObject(winamaxResult[i],bwinResult)
        const list = [winamaxResult[i],fdjClosestObject, betclicClosestObject, unibetClosestObject, pokerStarsClosestObject,
            bwinClosestObject]
        //console.log(list)
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
const  main = async () =>{
    console.log("hello")
    await estimateForLeague("ligue1")
    await estimateForLeague("premierLeague")
    process.exit()
}

main().then()