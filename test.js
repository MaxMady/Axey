let s = [ `Hithisisgood`, `nononogud` ]

s.forEach(e => {
    let i = e.split('')
    let m = `               `
    m.split('')
    i.forEach(o => {
        let index = i.indexOf(o)
        m[index] = o;
        console.log(m)
    })
    console.log(m + `|`)

})