const puppeteer = require("puppeteer")


const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    
    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup
    await page.goto("https://www.pokerstars.fr/sports/#/soccer/competitions/12735553")
      
 
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
  
getData().then()

module.exports={getData}
  
