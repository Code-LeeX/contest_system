import React, { Component } from 'react'
import { PageHeader, message } from 'antd';
import { Navigate } from 'react-router-dom'
import QuestionExercise from '../components/QuestionExercise';
import { doexerciseApi, getchqstsApi, getaqstApi, chfinApi, addwrongApi } from '../api/rqapi';
import './css/Exercise.css'

export default class Exercise extends Component {
    constructor(props) {
        super(props)
        this.state = { nowidx: 0, chqsts: [], go: false, upsed: false, finidx: 0, nodata:false }
        chfinApi({
            stu_id: window.localStorage.getItem('STU_id')
        }).then(res => {
            let finidx = res.fin[window.localStorage.getItem('exercise_ch') - 1];
            this.setState({ finidx: finidx }, () => {
                getchqstsApi({
                    ch_id: window.localStorage.getItem('exercise_ch')
                }).then(res => {
                    if(res.length<=0){this.setState({nodata:true});return;}
                    console.log(res);
                    this.setState({ chqsts: res, nowidx: ((this.state.finidx < res.length) ? (this.state.finidx) : (res.length - 1)) }, () => {
                        console.log(this.state);
                        getaqstApi({
                            ch_id: window.localStorage.getItem('exercise_ch'),
                            qst_id: this.state.chqsts[this.state.nowidx]['qst_id']
                        }).then(res2 => {
                            this.setState({ ...res2[0], upsed: true })
                        })
                    })
                })
            })
        })
    }
    goNextQst = () => {
        //!!!!!!!!!!判断本题是否已经做了，做完才能切换下一题！  不用了,在子组件里判断了
        let nowidx = this.state.nowidx;
        if (nowidx + 1 >= this.state.chqsts.length) { this.setState({ go: true }); return; }
        getaqstApi({
            ch_id: window.localStorage.getItem('exercise_ch'),
            qst_id: this.state.chqsts[nowidx + 1]['qst_id']
        }).then(res => {
            this.setState({ ...res[0], nowidx: nowidx + 1 })
        })
    }


    goLastQst = () => {
        //！！！！！！！！！！！！！！！！！！！！！！！！！怎么让切换到上一题直接显示解析？  nowidx减了，一旦小于finidx,自然就是解析
        if (this.state.nowidx <= 0) { message.info('当前已经是第1题了'); return }
        let nowidx = this.state.nowidx;
        getaqstApi({
            ch_id: window.localStorage.getItem('exercise_ch'),
            qst_id: this.state.chqsts[nowidx - 1]['qst_id']
        }).then(res => {
            this.setState({ ...res[0], nowidx: nowidx - 1 })
        })

    }
    gbck = () => {
        window.history.back()
    }
    state = {}
    finishedAQst = () => {
        this.setState({ finidx: this.state.finidx + 1 },()=>{
            doexerciseApi({
                stu_id: window.localStorage.getItem('STU_id'),
                ch_id: window.localStorage.getItem('exercise_ch'),
                fin_num: this.state.finidx
            })
        })
    }
    failed = () => {
        addwrongApi({
            stu_id: window.localStorage.getItem('STU_id'),
            ch_id: window.localStorage.getItem('exercise_ch'),
            qst_id: this.state.chqsts[this.state.nowidx]['qst_id']
        })
    }
    render() {
        const { qst_title, qst_type, qst_op1, qst_op2, qst_op3, qst_op4, qst_op5, qst_teach, qst_ans } = this.state;
        let ans = qst_ans
        let longAns = '';
        if (ans) { if (ans.search('A') >= 0) longAns += qst_op1 + ' '; if (ans.search('B') >= 0) longAns += qst_op2 + ' '; if (ans.search('C') >= 0) longAns += qst_op3 + ' '; if (ans.search('D') >= 0) longAns += qst_op4 + ' '; if (ans.search('E') >= 0) longAns += qst_op5 + ' '; }

        return (
            <div className='exercise_page_box'>
                <PageHeader
                    className="site-page-header"
                    onBack={this.gbck}
                    title={`章节${window.localStorage.getItem('exercise_ch')}`}
                />
                {this.state.go ? <Navigate to="/chapters"></Navigate> : ''}
                {this.state.nodata ? <Navigate to="/nodata"></Navigate> : ''}
                {this.state.upsed ? <QuestionExercise qstit={qst_title} qstype={qst_type} opa={qst_op1} opb={qst_op2} opc={qst_op3} opd={qst_op4} ope={qst_op5} teach={qst_teach} ans={qst_ans} goNextQst={this.goNextQst} goLastQst={this.goLastQst} longAns={longAns} failed={this.failed} finishedAQst={this.finishedAQst} hasdone={this.state.nowidx < this.state.finidx} befhasdone={this.state.nowidx===this.state.finidx-1}/> : ''}
            </div>
        )
    }
}
