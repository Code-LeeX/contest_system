const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/joincontest',(req,res)=>{
    const {stu_id,contest_id,time} = req.body;
    console.log('/joincontest',stu_id,contest_id,time);
    query(`select * from stucontime where stu_id = ${stu_id} and contest_id = ${contest_id};`,(_,results)=>{
        if(results.length<=0) {res.send('success');query(`insert into stucontime values(${stu_id},${contest_id},${time})`,()=>{})}
        else{
            query(`select * from stuconfin where stu_id = ${stu_id} and contest_id = ${contest_id};`,(_,res2)=>{
                if(res2.length>0) res.send({code:200,...res2[0]})
                else res.send(results[0])
            })
        }
    })
})

module.exports = router