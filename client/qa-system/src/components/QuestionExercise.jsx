import React, { Component } from 'react'
import { Radio, Space, Tag, Button, Checkbox, message } from 'antd';
import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import './css/css/question.css'


export default class Question extends Component {
    state = {
        qs_type: "",
        value: 0,
        subed: false,
        myans: "",
        checkList: []
    };

    componentDidUpdate() {
        const { qstype, hasdone } = this.props;
        this.c3.style.display = "none"; this.c2.style.display = 'none'; this.c1.style.display = "none";
        if (!hasdone) {
            this.answ_bx.style.display = 'none';
            this.ops_bx.style.display = 'block';
            if (qstype === 0) { this.c2.style.display = 'block'; }
            else if (qstype === 1) { this.c1.style.display = "block"; }
            else { this.c3.style.display = "block"; }
        }
        else{
            this.answ_bx.style.display = 'block';
            this.ops_bx.style.display = 'none';
        }
    }
    componentDidMount() {
        const { qstype, hasdone } = this.props;
        this.c3.style.display = "none"; this.c2.style.display = 'none'; this.c1.style.display = "none";
        if (!hasdone) {
            if (qstype === 0) { this.c2.style.display = 'block'; }
            else if (qstype === 1) { this.c1.style.display = "block"; }
            else { this.c3.style.display = "block"; }
        }
        else{
            this.answ_bx.style.display = 'block';
        }
    }


    toLastQuestion = () => {
        this.props.goLastQst()
    }
    toNextQuestion = () => {
        if(!this.props.hasdone && this.answ_bx.style.display==='none'){message.warn('本题还未完成');return;}
        this.props.goNextQst()
        this.setState({ checkList: [], value: 0 })
    }

    onChange = ee => {
        const { opa, opb, opc, opd, ope } = this.props;
        let myans;
        let e = ee.target.value
        if (e === 1) myans = opa; else if (e === 2) myans = opb; else if (e === 3) myans = opc; else if (e === 4) myans = opd; else myans = ope;
        this.setState({
            value: e,
            myans: myans
        });
    };
    muxonChange = e => {
        this.setState({ checkList: e })
        const { opa, opb, opc, opd, ope } = this.props;
        let opss = [opa, opb, opc, opd, ope]
        let myans = '';
        let sortede = e;
        sortede.sort()
        sortede.forEach(element => {
            myans += opss[element - 1] + ' ';
        });
        this.setState({
            myans: myans
        });
    }
    submitAnswer = () => {
        if (this.props.qstype === 2) {
            if (this.state.checkList.length === 0) {
                message.warn('你还未选择任何答案！');
                return;
            }
        }
        else {
            if (this.state.value === 0) {
                message.warn('你还未选择答案！');
                return;
            }
        }
        this.props.finishedAQst();
        if (this.state.myans.trim() !== this.props.longAns.trim()) { //如果答案不正确，发送给后端
            this.props.failed();
        }
    }
    render() {
        const { qstit, qstype, opa, opb, opc, opd, ope, teach, befhasdone } = this.props;
        const { value } = this.state;
        if (qstype === 0) this.state.qs_type = "判断题";
        else if (qstype === 1) this.state.qs_type = "单选题";
        else this.state.qs_type = "多选题";
        return (
            <>
                <div className="qst_main_box">
                    <LeftCircleTwoTone className='to_last_question' style={{ fontSize: '50px', cursor: 'pointer' }} onClick={this.toLastQuestion} />
                    <div className='qst_box'>
                        <div className='qsttitle'>
                            <Tag color="blue" className='qstypeTag'>{this.state.qs_type}</Tag>
                            {qstit}
                        </div>
                        <div className='qstopts' ref={c => this.ops_bx = c}>
                            <Radio.Group ref={c => this.c1 = c} onChange={this.onChange} value={value} style={{ display: 'none' }}>
                                <Space direction="vertical">
                                    <Radio value={1}>{opa}</Radio>
                                    <Radio value={2}>{opb}</Radio>
                                    <Radio value={3}>{opc}</Radio>
                                    <Radio value={4}>{opd}</Radio>
                                </Space>
                                <Button block onClick={this.submitAnswer}>确认答案</Button>
                            </Radio.Group>
                            <Radio.Group ref={c => this.c2 = c} onChange={this.onChange} value={value} style={{ display: 'none' }}>
                                <Space direction="vertical">
                                    <Radio value={1}>对</Radio>
                                    <Radio value={2}>错</Radio>
                                </Space>
                                <Button block onClick={this.submitAnswer}>确认答案</Button>
                            </Radio.Group>
                            <Checkbox.Group ref={c => this.c3 = c} onChange={this.muxonChange} value={this.state.checkList} style={{ display: 'none' }} defaultValue={[]}>
                                <Space direction="vertical">
                                    <Checkbox value={1}>{opa}</Checkbox>
                                    <Checkbox value={2}>{opb}</Checkbox>
                                    <Checkbox value={3}>{opc}</Checkbox>
                                    <Checkbox value={4}>{opd}</Checkbox>
                                    <Checkbox value={5}>{ope}</Checkbox>
                                </Space>
                                <Button block onClick={this.submitAnswer}>确认答案</Button>
                            </Checkbox.Group>
                        </div>
                        <div className='qstansw' ref={c => this.answ_bx = c} style={{ display: 'none' }}>
                            <Tag color="cyan" >我的答案</Tag>{befhasdone?this.state.myans:''}
                            <br />
                            <Tag color="green" >正确答案</Tag>{this.props.longAns}
                            <br />
                            <Tag color="red" >答案解析</Tag>{teach}
                        </div>
                    </div>
                    <RightCircleTwoTone className='to_next_question' style={{ fontSize: '50px', cursor: 'pointer' }} onClick={this.toNextQuestion} />
                </div>
            </>
        )
    }
}
