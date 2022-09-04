const {QuickDB} = require('quick.db')
const db = new QuickDB()

db.get(`pages`).then(e => console.log(e))