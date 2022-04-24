const express = require('express')
const query = require('./usedatabase')
const router = express.Router()

router.post('/login', (req, res) => {
    const { card_id, psw } = req.body;
    let cid = parseInt(card_id);
    console.log('login', cid);

    query(`select stu_psw from students where stu_card_id = ${cid};`, (_, results) => {
        if (results.length <= 0) {
            query(`select admin_psw from admins where admin_id = ${cid};`, (_, rr) => {
                console.log(rr);
                if (rr.length <= 0) res.send({ statusCode: 0 })
                else {
                    if (rr[0]["admin_psw"] === psw) res.send({ statusCode: 2 })
                    else res.send({ statusCode: 3 })
                }
            })
        }
        else {
            if (results[0]["stu_psw"] === psw) res.send({ statusCode: 1 })
            else res.send({ statusCode: 0 })
        }
    })

})

module.exports = router
