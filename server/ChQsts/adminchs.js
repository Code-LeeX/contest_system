const express = require('express')

const query = require('../usedatabase')

const router = express.Router()


router.post('/adminchs',(req,res)=>{
    console.log('adminchs');
    let tot = [0,0,0,0,0,0,0];
    let tps = [[],[],[],[],[],[],[]];
    for(let iter=0;iter<7;iter++){
        query(`select count(*) from qstch${iter+1}`,(_,results)=>{
            tot[iter] = results[0]['count(*)'];

        })
        query(`select count(*) from qstch${iter+1} where qst_type = 0;`,(_,results1)=>{
            query(`select count(*) from qstch${iter+1} where qst_type = 1;`,(_,results2)=>{
                query(`select count(*) from qstch${iter+1} where qst_type = 2;`,(_,results3)=>{
                    tps[iter] = [results1[0]['count(*)'], results2[0]['count(*)'], results3[0]['count(*)']]
                })
            })
        })
    }

    setTimeout(() => {
        res.send({tot,tps})
    }, 100);
})

module.exports = router


