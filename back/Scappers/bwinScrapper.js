const puppeteer = require("puppeteer")
const data = require('../data.json')
const idSite="bwin"

const getData = async (league) => {

    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const cookies = [{name:"OptanonAlertBoxClosed",value:"2022-10-08T17:23:23.381Z"}]



    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup
    await page.goto(data.league[league][idSite])
    await page.setCookie(...cookies);
    await page.reload()
 
    // 3 - Récupérer les données...
    // wait for the element
     await page.waitForSelector('.grid-event-wrapper');
     const result = await page.evaluate(()=>{
         let result =[]
         document.querySelectorAll(".grid-event-wrapper").forEach(e=>{
             const gameTitle=e.querySelector(".grid-event-name").innerText
             let odds=[]
             e.querySelectorAll(".option.option-value").forEach(e2=>{
                 odds.push(e2.innerText)})
             result.push(
                 {
                     team1:gameTitle.split("\n")[0],
                     team2:gameTitle.split("\n")[1],
                     odds1:odds[0],
                     odds2:odds[2],
                     oddsNul:odds[1],
                     idSite:"bwin"
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
  
