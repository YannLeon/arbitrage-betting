const puppeteer = require("puppeteer")
const data = require('../data.json')
const idSite="pokerStars"

const getData = async (league) => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    
    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup
    await page.goto(data.league[league][idSite])
      
 
    // 3 - Récupérer les données...
    // wait for the element
     await page.waitForSelector('.eventView.compHeader.eventView-soccer');
     const result = await page.evaluate(()=>{
         let result =[]
         document.querySelectorAll(".eventView.eventView-soccer").forEach(e=>{
             const gameTitle=e.querySelector(".textLink").innerText
             let odds=[]
             e.querySelectorAll(".button__bet__odds").forEach(e2=>{
                 odds.push(e2.innerText)})
             result.push(
                 {
                     team1:gameTitle.split("\n ")[0],
                     team2:gameTitle.split("\n ")[1],
                     odds1:odds[0],
                     odds2:odds[2],
                     oddsNul:odds[1],
                     idSite:"pokerStars"
                 }
             )
         })
        return Promise.resolve(result)
     })

    // 4 - Retourner les données
    //await browser.close()
    return result
  }
  

module.exports={getData}
  
