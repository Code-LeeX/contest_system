const express = require('express')
const query = require('./usedatabase')

const router = express.Router()


router.post('/regi',(req,res)=>{
    const{card_id,psw} = req.body;
    let cid = parseInt(card_id);
    query(`select 1 from students where stu_card_id = ${cid} limit 1`,(err,results)=>{
        if(err) console.log(err);  //错误处理
        else{
            if(results.length){
                query(`select stu_psw from students where stu_card_id = ${cid};`,(_,results)=>{
                    if(results[0]["stu_psw"]!=null) res.send({statusCode:1});
                    else{
                        query(`update students set stu_psw='${psw}' where stu_card_id = ${cid}`,()=>{})
                            // update 表名 set 字段名1=值1,字段名2=值2,字段名3=值3... where 条件;
                        res.send({statusCode:0})
                    }
                })
            }
            else{
                res.send({statusCode:2})
            }
        }
    })
})

module.exports = router

