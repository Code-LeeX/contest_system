const express = require('express')

const query = require('./usedatabase')

const router = express.Router()

router.post('/chfin',(req,res)=>{
    const{stu_id} = req.body;
    let tot = [0,0,0,0,0,0,0];
    let fin = [0,0,0,0,0,0,0];
    for(let iter=0;iter<7;iter++){
        query(`select count(*) from qstch${iter+1}`,(_,results)=>{
            tot[iter] = results[0]['count(*)'];
            // console.log(iter,results[0]['count(*)'],tot[iter]);
        })
        query(`select fin_num from stu2exers where stu_id=${stu_id} and ch_id=${iter+1}`,(_,results)=>{
            if(results.length<=0)fin[iter]=0;
            else fin[iter] = results[0]['fin_num'];
            // console.log(results[0]['count(*)']);
        })
    }
    // console.log({tot,fin});
    setTimeout(() => {
        res.send({tot,fin})
    }, 100);
})

module.exports = router