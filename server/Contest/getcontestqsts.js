const express = require('express')

const router = express.Router()

const query = require('../usedatabase')

router.post('/getcontestqsts',(req,res)=>{
    const {contest_id} = req.body;
    query(`select qstforcontest.qst_id,qst_type,qst_title,qst_op1,qst_op2,qst_op3,qst_op4,qst_op5,qst_score from contest2qst,qstforcontest where contest2qst.qst_id=qstforcontest.qst_id and contest_id = ${contest_id};`,(_,results)=>{
        res.send(results);
    })
})

module.exports = router