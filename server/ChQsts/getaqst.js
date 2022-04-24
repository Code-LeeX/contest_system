const express = require('express')

const query = require('../usedatabase')

const router = express.Router()


router.post('/getaqst',(req,res)=>{
    const{ch_id,qst_id} = req.body;
    query(`select * from qstch${ch_id} where qst_id=${qst_id}`,(_,results)=>{
        res.send(results);
    })
})

module.exports = router