const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/delcontest',(req,res)=>{
    const {contest_id} = req.body;
    console.log('/delcontest',contest_id);
    query(`delete from contests where contest_id = ${contest_id};`,(err,results)=>{
        if(err){console.log(err);return;}
        res.send({code:200})
    })
})

module.exports = router