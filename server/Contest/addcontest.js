const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/addcontest',(req,res)=>{
    const {contest_name,contest_time,tmtot,lastid} = req.body;
    console.log('/addcontest',contest_name,contest_time,tmtot,lastid);
    query(`insert into contests values(NULL,'${contest_name}',${contest_time});`,()=>{})
    query(`select max(contest_id) from contests`,(_,r1)=>{
        let contest_id = r1[0]['max(contest_id)'];
        for(let iter=lastid-tmtot+1;iter<=lastid;iter++){
            query(`insert into contest2qst values(${contest_id},${iter})`)
        }
    })
    res.send({code:200})
})

module.exports = router