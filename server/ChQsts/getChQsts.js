const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/getchqsts',(req,res)=>{
    const{ch_id} = req.body;
    query(`select qst_id from qstch${ch_id}`,(_,results)=>{
        res.send(results);
    })
})

module.exports = router