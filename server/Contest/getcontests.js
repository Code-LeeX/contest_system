const express = require('express')

const query = require('../usedatabase')

const router = express.Router()


router.post('/getcontests',(req,res)=>{
    query(`select * from contests;`,(_,results)=>{
        res.send(results);
    })
})

module.exports = router