const express = require('express')

const query = require('../usedatabase')

const router = express.Router()

router.post('/addchqst', (req, res) => {
    const { qst_type, qst_ans, qst_title, qst_teach, qst_score, qst_op1, qst_op2, qst_op3, qst_op4, qst_op5, chaptervalue } = req.body;
    query(`insert into qstch${chaptervalue} values(NULL,${qst_type},'${qst_title}','${qst_op1}','${qst_op2}','${qst_op3}','${qst_op4}','${qst_op5}','${qst_ans}','${qst_teach}',${qst_score});`, (err, results) => {
        if (err) console.log(err);
        // else console.log(results);
    })
}) 

module.exports = router

