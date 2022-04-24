const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/doexercise', (req, res) => {
    const { ch_id, fin_num, stu_id } = req.body;
    console.log('doexercise :',ch_id, fin_num, stu_id);
    query(`select * from stu2exers where stu_id = ${stu_id} and ch_id = ${ch_id}`, (err,res)=>{
        if(err){console.log(err);return;}
        if(res.length>0) query(`update stu2exers set fin_num=${fin_num} where stu_id = ${stu_id} and ch_id = ${ch_id}`, () => { })
        else query(`insert into stu2exers values(${stu_id},${ch_id},${fin_num})`, () => { })
    })
    
    res.send('')
})

module.exports = router

