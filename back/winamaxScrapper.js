const puppeteer = require("puppeteer")

const getScreenshot = async () => {
  const browser = await puppeteer.launch(
    { headless: false }
  )
  const page = await browser.newPage()
  await page.goto("http://books.toscrape.com/")
  await page.screenshot({ path: "./screenshots/"+new Date(Date.now()).toISOString()+".png" })
  await browser.close()
}

const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const cookies = [{name:"winacookie", value:"!winaanalytics=true!winasettings=true!winasocial=true"}]
    
    
    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup
    await page.goto("https://www.winamax.fr/paris-sportifs/sports/1/7/4")
    await page.setCookie(...cookies);
      
 
    // 3 - Récupérer les données...
    // wait for the element
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
     })

    // 4 - Retourner les données
    await browser.close()
    return result
  }
  


module.exports={getData}
  
