const xl = require('xlsx');
const query = require('./usedatabase')


function impQSTfromExcel(workbook, dbid) {
    if(dbid<1) return;
    if(dbid>7) return;
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetNames[0]];
    const qstJson = xl.utils.sheet_to_json(worksheet);
    for (let iter = 0; iter < qstJson.length; iter++) {
        const qst = qstJson[iter];
        let qst_type;
        if(qst['题型']==='单选题')qst_type=1;
        else if(qst['题型']==='多选题')qst_type=2;
        else qst_type=0;
        let qst_title = qst['题目']
        let qst_op1 = qst['选项A']
        let qst_op2 = qst['选项B']
        let qst_op3 = qst['选项C']
        let qst_op4 = qst['选项D']
        let qst_op5 = qst['选项E']
        let qst_ans = qst['正确答案']
        let qst_teach = qst['答案解析']
        let qst_score = qst['分值']
        query(`insert into qstch${dbid} values(NULL,${qst_type},'${qst_title}','${qst_op1}','${qst_op2}','${qst_op3}','${qst_op4}','${qst_op5}','${qst_ans}','${qst_teach}',${qst_score});`, (err, results) => {
            if (err) console.log(err);
            // else console.log(results);
        })
    }
    return;
}


module.exports = impQSTfromExcel;

// impQSTfromExcel(xl.readFile("./tk1.xlsx"),1)