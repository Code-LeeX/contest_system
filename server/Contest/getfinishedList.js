const express = require('express')

const query = require('../usedatabase')

const router = express.Router()


router.post('/getfinishedlist',(req,res)=>{
    const {contest_id} = req.body;
    query(`select * from stuconfin where contest_id = ${contest_id} order by score desc;`,(_,results)=>{
        res.send(results);
    })
})

module.exports = router