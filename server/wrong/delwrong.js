const express = require('express')
const query = require('../usedatabase')
const router = express.Router()

router.post('/delwrong', (req, res) => {
    const { ch_id, qst_id, stu_id } = req.body;
    query(`delete from stu2wrongs where ch_id=${ch_id} and qst_id=${qst_id} and stu_id=${stu_id}`, () => { })
        //delete from 表名 where 条件
    res.send('')
})

module.exports = router

