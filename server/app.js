const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json());  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: false
}));


const regirouter = require('./regi')
app.use('/',regirouter)
app.use('/',require('./login'))
app.use('/',require('./chfin'))

app.use('/',require('./ChQsts/getaqst'))
app.use('/',require('./ChQsts/getChQsts'))
app.use('/',require('./ChQsts/addchqst'))
app.use('/',require('./ChQsts/adminchs'))
app.use('/',require('./ChQsts/doexercise'))

app.use('/',require('./addchqstbyexcel'))
app.use('/',require('./addconqstbyexcel'))


app.use('/',require('./wrong/addwrong'))
app.use('/',require('./wrong/delwrong'))
app.use('/',require('./wrong/getwrongs'))


app.use('/',require('./Contest/getcontestinfo'))
app.use('/',require('./Contest/getcontests'))
app.use('/',require('./Contest/getcontestqsts'))
app.use('/',require('./Contest/joincontest'))
app.use('/',require('./Contest/delcontest'))
app.use('/',require('./Contest/getcontestans'))
app.use('/',require('./Contest/finishcontest'))
app.use('/',require('./Contest/addcontest'))
app.use('/',require('./Contest/contestfinstate'))
app.use('/',require('./Contest/getfinishedList'))

app.listen(8080)