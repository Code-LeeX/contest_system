const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/finishcontest',(req,res)=>{
    const {contest_id,stu_id,time,score} = req.body;
    console.log('finishcontest',contest_id,stu_id,time,score);
    query(`insert into stuconfin values(${stu_id},${contest_id},${time},${score})`,()=>{})
    res.send({code:200})
})

module.exports = router