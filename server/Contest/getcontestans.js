const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/getcontestans',(req,res)=>{
    const {contest_id} = req.body;
    query(`select qstforcontest.qst_id,qst_ans,qst_teach from contest2qst,qstforcontest where contest2qst.qst_id=qstforcontest.qst_id and contest_id = ${contest_id};`,(_,results)=>{
        res.send(results);
    })
})

module.exports = router