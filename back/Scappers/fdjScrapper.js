const puppeteer = require("puppeteer")

const data = require('../data.json')
const idSite="fdj"

const getData = async (league) => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const cookies = [{name:"TC_PRIVACY_PSEL", value:"0@037%7C14%7C1881@8%2C9%2C10@@1664799872669%2C1664799872669%2C1680351872669@"}]
    
    
    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup

    await page.goto(data.league[league][idSite])
    await page.setCookie(...cookies);
    await page.reload()
      
 
    // 3 - Récupérer les données...
    // wait for the element
     await page.waitForSelector('.wpsel-eventBloc');
     const result = await page.evaluate(()=>{
         let result =[]
         document.querySelectorAll(".wpsel-bloc.wpsel-bloc__main").forEach(e=>{
             const gameTitle=(e.innerText.split("\n")).filter(e=>e.includes('-'))[0]
             let odds = []
             e.querySelectorAll(".outcomeButton-data").forEach(e2=>{
                 odds.push(e2.innerText)
             })
             result.push({
                 team1:gameTitle.split(" - ")[0],
                 team2:gameTitle.split(" - ")[1],
                 odds1:odds[0],
                 odds2:odds[2],
                 oddsNul:odds[1],
                 idSite:"fdj"
             })
         })
        return Promise.resolve(result)
     })

    // 4 - Retourner les données
    //await browser.close()
    return result
  }


module.exports={getData}
  
