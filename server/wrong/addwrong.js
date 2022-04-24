const express = require('express')
const query = require('../usedatabase')

const router = express.Router()

router.post('/addwrong', (req, res) => {
    const { ch_id, qst_id, stu_id } = req.body;
    query(`insert into stu2wrongs values(${stu_id},${ch_id},${qst_id});`, () => { })
})

module.exports = router

