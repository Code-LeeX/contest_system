const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/getcontestinfo',(req,res)=>{
    const {contest_id} = req.body;
    console.log('getcontestinfo: ',contest_id);
    query(`select count(*) from contest2qst,qstforcontest where qstforcontest.qst_id=contest2qst.qst_id and contest_id = ${contest_id} and qst_type = 0;`,(_,results1)=>{
        query(`select count(*) from contest2qst,qstforcontest where qstforcontest.qst_id=contest2qst.qst_id and contest_id = ${contest_id} and qst_type = 1;`,(_,results2)=>{
            query(`select count(*) from contest2qst,qstforcontest where qstforcontest.qst_id=contest2qst.qst_id and contest_id = ${contest_id} and qst_type = 2;`,(_,results3)=>{
                res.send([results1[0]['count(*)'], results2[0]['count(*)'], results3[0]['count(*)'], results1[0]['count(*)']+results2[0]['count(*)']+results3[0]['count(*)']])
            })
        })
    })
})

module.exports = router