
const getMaxWithIndex=(list, index)=>{
    let max={odd:0}
    list.forEach(e=>{
        const result = parseFloat(e[index].replace(',','.'))
        if(result>max.odd){
            max={odd:result, idSite:e.idSite}
        }
    })
    return max
}
const compare = (list) =>{
    const max1=getMaxWithIndex(list,'odds1')
    const max2=getMaxWithIndex(list,'odds2')
    const maxNul=getMaxWithIndex(list,'oddsNul')

    return(1/max1.odd+1/max2.odd+1/maxNul.odd)
}

const estimate = (list, total, invest) =>{
    let max1=getMaxWithIndex(list,'odds1')
    let max2=getMaxWithIndex(list,'odds2')
    let maxNul=getMaxWithIndex(list,'oddsNul')

    max1={...max1, amountToBet:(invest/(max1.odd*total))}
    max2={...max2, amountToBet:(invest/(max2.odd*total))}
    maxNul={...maxNul, amountToBet:(invest/(maxNul.odd*total))}


}

module.exports={compare}