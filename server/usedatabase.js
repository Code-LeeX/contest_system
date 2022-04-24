const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'090405Lx!',
    database:'honesty_contest'
})

function query(sql,fun){
    db.query(sql,fun)
}

module.exports = query;