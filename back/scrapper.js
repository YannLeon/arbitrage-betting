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
function waitFor (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function scrollToBottom (page) {

    let retryScrollCount = 3

    while (retryScrollCount > 0) {
        try {
            let scrollPosition = await page.$eval('.ReactVirtualized__List', wrapper => wrapper.scrollTop)

            await page.evaluate(() => document.querySelector('.ReactVirtualized__List').scrollBy({ top: 200, behavior: 'smooth' }))
            await waitFor(200)

            await page.waitForFunction(`document.querySelector('.ReactVirtualized__List').scrollTop > ${scrollPosition}`, { timeout: 1_000 })

            retryScrollCount = 3
        } catch {
            retryScrollCount--
        }
    }
}
const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    const cookies = [{name:"winacookie", value:"!winaanalytics=true!winasettings=true!winasocial=true"}]
    
    
    // 2 - Naviguer jusqu'à l'URL cible
    const winamaxPage = await page.goto("https://www.winamax.fr/paris-sportifs/sports/1/7/4")
    await page.setCookie(...cookies);

    // 3 - Cliquer sur accepter cookies
   /* await page.click(
        "#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img"
      )*/
      
 
    // 4 - Récupérer les données...
    /*const result = await page.evaluate(() => {
        let title = document.querySelector("h1").innerText
        let price = document.querySelector(".price_color").innerText
        
        return { title, price }
      })
      */
     await page.waitForSelector('.sc-jqUVSM');
     const result = await page.evaluate(()=>{
        //console.log("oui")
        let result=[]
        let element = document.querySelector(".ReactVirtualized__Grid").children[0].childNodes.forEach(e => {
            const l = e.innerText.split('\n')
            result.push([l[8],l[9],l[11],l[12],l[14],l[15]])
        });
        //children[1].innerText.split('\n')

        //let element = document.querySelectorAll(".sc-jqUVSM")
        //console.log(element)
        return Promise.resolve(result)
     })

    // 5 - Retourner les données
    //browser.close()

    //console.log(result)
    return result
  }
  
  // Appel de la fonction getData() et affichage des données
  getData().then(value => {
    console.log(value)
  })
  
