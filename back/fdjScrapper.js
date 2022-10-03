const puppeteer = require("puppeteer")


const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const cookies = [{name:"TC_PRIVACY_PSEL", value:"0@037%7C14%7C1881@8%2C9%2C10@@1664799872669%2C1664799872669%2C1680351872669@"}]
    
    
    // 2 - Naviguer jusqu'à l'URL cible et set les cookies pour passer à travers de la popup
    await page.goto("https://www.enligne.parionssport.fdj.fr/paris-football/france/ligue-1-uber-eats")
    await page.setCookie(...cookies);
      
 
    // 3 - Récupérer les données...
    // wait for the element
     await page.waitForSelector('.wpsel-eventBloc');
     const result = await page.evaluate(()=>{
        let gameRaw=[]
         let gameClean=[]
         let result =[]
        //result.push(document.querySelector(".wpsel-eventBloc").innerText)
         document.querySelectorAll(".wpsel-eventBloc").forEach(e=>{
             gameRaw =[...gameRaw,...(e.innerText.split("+"))]
         })

         gameRaw  = gameRaw.filter(e=>e.includes('-'))
        gameRaw.forEach(e=>{
            const splitInTwo=e.split("-")
            gameClean.push([splitInTwo[0].split('\n').reverse()[0],...splitInTwo[1].split('\n').filter(el=>el!=="")])
        })
        gameClean.forEach(l=>{
            result.push({team1:l[0].trim(),team2:l[1].trim(),odds1:l[3], odds2:l[5],oddsNul:l[4], idSite:"fdj"})
        })
        return Promise.resolve(result)
     })

    // 4 - Retourner les données
    // console.log(result)
    await browser.close()
    return result
  }
  
getData().then()

module.exports={getData}
  
