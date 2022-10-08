const puppeteer = require("puppeteer")


const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    const cookies = [{name:"TC_PRIVACY", value:"0%21004%7C19%7C5606%215%2C2%216%211665236807845%2C1665236747021%2C1680788807845%21"},
        {name:"TC_PRIVACY_CENTER", value:"5%2C2"}]
    
    
    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup

    await page.goto("https://www.betclic.fr/football-s1/ligue-1-uber-eats-c4")
    await page.setCookie(...cookies);
    await page.reload()
 
    // 3 - Récupérer les données...
    // wait for the element
    /*
     await page.waitForSelector('.ReactVirtualized__Grid');
     const result = await page.evaluate(()=>{
        let result=[]
        document.querySelector(".ReactVirtualized__Grid").children[0].childNodes.forEach(e => {
            const l = e.innerText.split('\n')
            //17 is to be sure to have the correct element (the one with the odds)
            if(l.length===17){
            result.push(
            {team1:l[8],team2:l[14],odds1:l[9], odds2:l[15],oddsNul:l[12], idSite:"winamax"})}
        });

        return Promise.resolve(result)
     })*/
    await page.waitForSelector('.ng-star-inserted');
    const result = await page.evaluate(()=> {
        let result=[]
        document.querySelectorAll(".cardEvent.ng-star-inserted").forEach(e=>{
            const innerText = e.innerText.split('\n')
            result.push({team1:innerText[2], team2:innerText[4], odds1:innerText[6],odds2:innerText[12], oddsNul:innerText[9], idSite: 'betclic'})
        })
        return Promise.resolve(result)
    })
    await result
    // 4 - Retourner les données
    await browser.close()
    return result
  }


module.exports={getData}
  
