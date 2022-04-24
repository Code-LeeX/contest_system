const express = require('express')

const router = express.Router()

const query = require('../usedatabase')

router.post('/getwrongs',(req,res)=>{
    const{stu_id} = req.body;
    query(`select ch_id,qst_id from stu2wrongs where stu_id=${stu_id}`,(_,results)=>{
        res.send(results);
    })
})

module.exports = router