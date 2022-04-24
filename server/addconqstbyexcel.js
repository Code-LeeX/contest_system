const express = require('express')
const impConQSTfromExcel = require('./xlsx2consql')
const fs = require("fs");
const multiparty = require('multiparty');
const xl = require('xlsx');
const query = require('./usedatabase')


const router = express.Router()
router.post('/addconqstbyexcel', (req, res) => {
    console.log('addconqstbyexcel');
    let form = new multiparty.Form();
    form.uploadDir = './uploads';

    form.parse(req, function (err, fields, files) {
        try {

            let inputFile = files.file[0];
            let newPath = form.uploadDir + "/" + inputFile.originalFilename;
            fs.renameSync(inputFile.path, newPath);
            const workbook = xl.readFile(newPath);
            const lenth = impConQSTfromExcel(workbook);
            query(`select max(qst_id) from qstforcontest`, (err, res2) => {
                a = res2[0]['max(qst_id)'];
                res.send({ data: "上传成功！", lenth, a });
            })
            fs.unlink(newPath, () => { })
        } catch (err) {
            console.log(err);
            res.send({ err: "上传失败！" });
        };
    })
})


module.exports = router