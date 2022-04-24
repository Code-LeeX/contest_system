const express = require('express')

const query = require('../usedatabase')

const router = express.Router()


router.post('/confinstate',(_,res)=>{
    query(`select contest_name,count(*),avg(score),c.contest_id from contests c join stuconfin s on c.contest_id=s.contest_id group by c.contest_id;`,(err,results)=>{
        res.send(results)
    })
})

module.exports = router