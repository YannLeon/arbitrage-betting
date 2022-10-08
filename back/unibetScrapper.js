const puppeteer = require("puppeteer")


const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    
    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup
    await page.goto("https://www.unibet.fr/sport/football/ligue-1-ubereats")
      
 
    // 3 - Récupérer les données...
    // wait for the element
     await page.waitForSelector('.bettingbox-content.oddsbox-hide-marketname.bettingbox-wide');
     const result = await page.evaluate(()=>{
         let result =[]
         document.querySelectorAll(".ui-touchlink.had-market.inline-market.calendar-event.cell").forEach(e=>{
             const gameTitle=e.querySelector(".sportsfeed_article_title-fav").innerText
             let odds=[]
             e.querySelectorAll(".ui-touchlink-needsclick.price.odd-price").forEach(e2=>{
                 odds.push(e2.innerText.split("\n")[1])
             })
             result.push(
                 {
                     team1:gameTitle.split(" - ")[0],
                     team2:gameTitle.split(" - ")[1],
                     odds1:odds[0],
                     odds2:odds[2],
                     oddsNul:odds[1],
                     idSite:"unibet"
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
  
