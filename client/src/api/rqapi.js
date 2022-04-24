import request from './request'

export const registerApi = (params)=>request.post('/regi',params)
export const loginApi = (params)=>request.post('/login',params)
export const chfinApi = (params)=>request.post('/chfin',params)
export const rdmqApi = (params)=>request.post('/arandomq',params) //以后删除
export const doexerciseApi = (params)=>request.post('/doexercise',params)
export const getwrongsApi = (params)=>request.post('/getwrongs',params)
export const getaqstApi = (params)=>request.post('/getaqst',params) //由章节id和题目id获取题目
export const getchqstsApi = (params)=>request.post('/getchqsts',params) //由章节id获取该章节所有题目id
export const delwrongApi = (params)=>request.post('/delwrong',params)
export const addwrongApi = (params)=>request.post('/addwrong',params)
export const getcontestsApi = (params)=>request.post('/getcontests',params)
export const getcontestinfoApi = (params)=>request.post('/getcontestinfo',params)
export const getcontestqstsApi = (params)=>request.post('/getcontestqsts',params)
export const joincontestApi = (params)=>request.post('/joincontest',params)
export const addchqstApi = (params)=>request.post('/addchqst',params)
export const addchqstbyexcelApi = (params)=>request.post('/addchqstbyexcel',params)
export const adminchsApi = (params)=>request.post('/adminchs',params)
export const delcontestApi = (params)=>request.post('/delcontest',params)
export const getcontestansApi = (params)=>request.post('/getcontestans',params)
export const finishcontestApi = (params)=>request.post('/finishcontest',params)
export const addcontestApi = (params)=>request.post('/addcontest',params)
export const confinstateApi = (params)=>request.post('/confinstate',params)
export const getfinlistApi = (params)=>request.post('/getfinishedlist',params)


