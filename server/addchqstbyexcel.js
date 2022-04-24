const express = require('express')
const impQSTfromExcel = require('./xlsx2sql')
const xl = require('xlsx');
var fs = require("fs");
const multiparty = require('multiparty');


const router = express.Router()
router.post('/addchqstbyexcel', (req, res) => {
    console.log('addchqstbyexcel');
    let form = new multiparty.Form();
    form.uploadDir = './uploads';

    form.parse(req, function (err, fields, files) {
        try {
            const {chaptervalue} = req.headers;
            console.log('addchqstbyexcel',chaptervalue);
            let inputFile = files.file[0];
            let newPath = form.uploadDir + "/" + inputFile.originalFilename;
            fs.renameSync(inputFile.path, newPath);
            res.send({ data: "上传成功！" });
            impQSTfromExcel(xl.readFile(newPath), chaptervalue)
            fs.unlink(newPath,()=>{})
        } catch (err) {
            console.log(err);
            res.send({ err: "上传失败！" });
        };
    })
})


module.exports = router




// /* 设置编辑 */
// form.encoding = 'utf-8';

//设置文件大小限制
// form.maxFilesSize = 1 * 1024 * 1024;