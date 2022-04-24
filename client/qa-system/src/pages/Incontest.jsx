import React, { Component } from 'react'
import { Result, Button } from 'antd';
import { Modal, message, Statistic, Skeleton, Tag, Divider } from 'antd';
import { Navigate } from 'react-router-dom'
import QuestionContest from '../components/QuestionContest';
import QuestionAftCon from '../components/QuestionAftCon';
import { getcontestqstsApi, joincontestApi, getcontestansApi, finishcontestApi } from '../api/rqapi';
import './css/Incontest.css'

const { Countdown } = Statistic;

class AQstInContest {
    constructor() {
        this.value = 0;
        this.checkList = [];
        this.marked = false;
    }
}

export default class Incontest extends Component {
    constructor(props) {
        super(props)
        this.state = { myscore: 0, nowidx: 0, visible: false, modalText: "确定提交吗？", confirmLoading: false, contestanss: [], contestqsts: [], qstStates: [], upsed: false, nodata: false, countcolor: 'black', hasjoined: false, notsub: true, notinteach: true, endtime: 0, deadline:0 }
        let nowtime = (new Date()).valueOf();
        let deadline;
        joincontestApi({
            stu_id: window.localStorage.getItem('STU_id'),
            contest_id: window.localStorage.getItem('contest_id'),
            time: nowtime
        }).then(res => {
            if (res === 'success') deadline = Date.now() + window.localStorage.getItem('timeLimit') * 60 * 1000;
            else deadline = res['time'] + window.localStorage.getItem('timeLimit') * 60 * 1000;
            if(res.code===200){message.warn(`你已参加过这场竞赛！成绩为${res.score}分`); this.setState({ hasjoined: true }); return;}
            else if (deadline < nowtime) { message.warn('你已参加过这场竞赛！'); 
            this.setState({ hasjoined: true }); return; 
        }
        })
        getcontestqstsApi({
            contest_id: window.localStorage.getItem('contest_id')
        }).then(res => {
            if (res.length <= 0) { this.setState({ nodata: true }); return; }
            let contestqsts = res
            let qstnuml = contestqsts.length;//题目总数  之后要构造同等长度的数组，存放每一题的作答情况与标记情况
            let qstStates = [];
            for (let i = 0; i < qstnuml; i++) {
                let aqic = new AQstInContest();
                qstStates.push(aqic);
            }
            this.setState({ ...contestqsts[0], ...qstStates[0], contestqsts, qstStates, upsed: true, deadline})
        })
    }
    goNextQst = () => {
        let nowidx = this.state.nowidx;
        if (nowidx + 1 >= this.state.contestqsts.length) {
            this.setState({ visible: true })
            return;
        } //!!!!!!!!!!! 最后一题点下一题的处理！！！！
        this.setState({ ...this.state.contestqsts[nowidx + 1], ...this.state.qstStates[nowidx + 1], nowidx: nowidx + 1 })
    }
    calmyans = (idx) => {  //得到 ‘我的答案’， 然后在下边与正确答案相比较
        if(this.state.qstStates[idx].value===0&&this.state.qstStates[idx].checkList.length===0) return 'nullAnswer'
        if (this.state.contestqsts[idx].qst_type === 0) return this.state.qstStates[idx].value === 1 ? 'A' : 'B';
        else if (this.state.contestqsts[idx].qst_type === 1) { let mansvl = this.state.qstStates[idx].value; if (mansvl === 1) return 'A'; else if (mansvl === 2) return 'B'; else if (mansvl === 3) return 'C'; else return 'D'; }
        else {
            let checkList = this.state.qstStates[idx].checkList;
            let res = '';
            for (let i = 0; i < checkList.length; i++) {
                let value = checkList[i];
                if (value === 1) res += 'A'; else if (value === 2) res += 'B'; else if (value === 3) res += 'C'; else if (value === 4) res += 'D'; else res += 'E';
            }
            return res;
        }
    }
    handleOk = () => {
        let nowtime = (new Date()).valueOf();
        this.setState({ confirmLoading: true, modalText: "正在提交并判定成绩，请稍后" })
        getcontestansApi({
            contest_id: window.localStorage.getItem('contest_id')
        }).then(res => {
            let myscore = 0;
            for (let i = 0; i < res.length; i++) {
                if (this.calmyans(i) === res[i].qst_ans.trim()) {myscore += this.state.contestqsts[i].qst_score; console.log(this.calmyans(i),res[i].qst_ans.trim());}
            }
            this.setState({ contestanss: res, myscore: myscore })
            finishcontestApi({
                stu_id: window.localStorage.getItem('STU_id'),
                contest_id: window.localStorage.getItem('contest_id'),
                time: nowtime,
                score: myscore
            })
            this.setState({ visible: false, confirmLoading: false, endtime: nowtime, notsub:false, nowidx:0,...this.state.contestqsts[0], ...this.state.qstStates[0] },()=>{})
        })
    };

    goLastQst = () => {
        let nowidx = this.state.nowidx;
        if (nowidx <= 0) { message.info('当前已经是第1题了'); return; }
        this.setState({ ...this.state.contestqsts[nowidx - 1], ...this.state.qstStates[nowidx - 1], nowidx: nowidx - 1 })
    }
    jumpto = (idx) => {
        return () => {
            this.setState({ ...this.state.contestqsts[idx], ...this.state.qstStates[idx], nowidx: idx })
        }
    }
    onChange = e => {
        const { nowidx, qstStates } = this.state;
        qstStates[nowidx].value = e;
        this.setState({ ...qstStates[nowidx], qstStates })
    }
    muxonChange = e => {
        const { nowidx, qstStates } = this.state;
        qstStates[nowidx].checkList = e;
        this.setState({ ...qstStates[nowidx], qstStates })
    }
    clickMark = () => {
        const { nowidx, qstStates } = this.state;
        qstStates[nowidx].marked = !qstStates[nowidx].marked;
        this.setState({ ...qstStates[nowidx], qstStates })
    }
    onFinish = () => {
        let nowtime = (new Date()).valueOf();
        getcontestansApi({
            contest_id: window.localStorage.getItem('contest_id')
        }).then(res => {
            let myscore = 0;
            for (let i = 0; i < res.length; i++) {
                if (this.calmyans(i) === res[i].qst_ans.trim()) myscore += this.state.contestqsts[i].qst_score;
            }
            this.setState({ contestanss: res, myscore: myscore })
            finishcontestApi({
                stu_id: window.localStorage.getItem('STU_id'),
                contest_id: window.localStorage.getItem('contest_id'),
                time: nowtime,
                score: myscore
            })
            this.setState({ visible: false, confirmLoading: false, endtime: nowtime, notsub:false, nowidx:0,...this.state.contestqsts[0], ...this.state.qstStates[0] },()=>{})
        })
    }
    timeonChange = val => {
        if (9.95 * 1000 < val && val < 10 * 1000) {
            this.setState({ countcolor: 'rgb(252,85,49)' })
            //闪烁
        }
    }
    getbtnColor = (item) => {
        if (item.marked) return { backgroundColor: 'rgb(254,107,0)', color: 'white' }
        if (item.value > 0 || item.checkList.length > 0) return { backgroundColor: 'rgb(24,144,255)', color: 'white' };
        else return {};
    }
    opendatika = () => {
        let nwdsp = this.datika.style.display;
        if (nwdsp === 'block') nwdsp = 'none'; else nwdsp = 'block'
        this.datika.style.display = nwdsp;
    }

    goNextQstTeach = () => {
        let nowidx = this.state.nowidx;
        if (nowidx + 1 >= this.state.contestqsts.length) {
            message.warn('当前已经是最后一题了！')
            return;
        }
        this.setState({ ...this.state.contestqsts[nowidx + 1], ...this.state.qstStates[nowidx + 1], nowidx: nowidx + 1 })
    }
    render() {
        const { qst_title, qst_type, qst_op1, qst_op2, qst_op3, qst_op4, qst_op5, value, checkList, marked } = this.state;
        const answCondition = (
            <div className='datika' ref={c => this.datika = c} style={{ display: 'none' }}>
                {
                    this.state.qstStates.map((item, index) => {
                        return <Button shape="circle" onClick={this.jumpto(index)} style={this.getbtnColor(item)} > {index + 1} </Button>;
                    })
                }
                <Divider />
                <Tag color="blue">已完成</Tag>&nbsp;<Tag color="default">未完成</Tag><Tag color="orange">带标记</Tag>
            </div>
        );
        return (
            <>
                {this.state.notsub && this.state.upsed ? (
                    <div className="popover_box">
                        {answCondition}
                        <Button type="primary" onClick={this.opendatika} style={{ float: 'right' }}>点我展开答题卡</Button>
                    </div>
                ) : ''}

                {this.state.notsub && this.state.upsed ? <Countdown ref={cr => this.countdown = cr} title="距离提交截止还有" value={this.state.deadline} onFinish={this.onFinish} className='downtime' onChange={this.timeonChange} valueStyle={{ color: this.state.countcolor }} /> : ''}
                {this.state.upsed ? '' : <Skeleton active />}
                {this.state.nodata ? <Navigate to="/nodata"></Navigate> : ''}
                {this.state.hasjoined ? <Navigate to="/contests"></Navigate> : ''}

                {this.state.notsub && this.state.upsed ? <QuestionContest qstit={qst_title} qstype={qst_type} opa={qst_op1} opb={qst_op2} opc={qst_op3} opd={qst_op4} ope={qst_op5} value={value} checkList={checkList} marked={marked} goNextQst={this.goNextQst} goLastQst={this.goLastQst} onChange={this.onChange} muxonChange={this.muxonChange} clickMark={this.clickMark} /> : ''}
                {!this.state.notsub && this.state.notinteach ? <Result
                    status="success"
                    title={`你的竞赛成绩为${this.state.myscore}, 总计用时为${window.localStorage.getItem('timeLimit')-parseInt((this.state.deadline-this.state.endtime)/60000)}分钟`}
                    extra={[
                        <Button type="primary" onClick={() => { this.setState({ notinteach: false }) }}>
                            去查看题目解析
                        </Button>,
                        <Button onClick={() => { this.setState({ hasjoined: true }); }}>返回竞赛列表</Button>,
                    ]}
                /> : ''}
                {!this.state.notsub && !this.state.notinteach ? <QuestionAftCon qstit={qst_title} goNextQst={this.goNextQstTeach} goLastQst={this.goLastQst} qstype={qst_type} teach={this.state.contestanss[this.state.nowidx].qst_teach} value={value} checkList={checkList} ans={this.state.contestanss[this.state.nowidx].qst_ans} op1={qst_op1} op2={qst_op2} op3={qst_op3} op4={qst_op4} op5={qst_op5} /> : ''}
                <Modal
                    // title="Title"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.confirmLoading}
                    onCancel={() => this.setState({ visible: false })}
                    okText="确定"
                    cancelText="再检查一下"
                >
                    <p>{this.state.modalText}</p>
                </Modal>
            </>

        )
    }
}

