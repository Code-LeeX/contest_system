import React, { Component } from 'react'
import { Radio, Space, Tag, Button, Checkbox} from 'antd';
import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import './css/css/question.css'

export default class Question extends Component {

    componentDidUpdate() {
        const { qstype } = this.props;
        this.c3.style.display = "none"; this.c2.style.display = 'none'; this.c1.style.display = "none";
        if (qstype === 0) { this.c2.style.display = 'block'; }
        else if (qstype === 1) { this.c1.style.display = "block"; }
        else { this.c3.style.display = "block"; }
    }
    componentDidMount() {
        const { qstype } = this.props;
        this.c3.style.display = "none"; this.c2.style.display = 'none'; this.c1.style.display = "none";
        if (qstype === 0) { this.c2.style.display = 'block'; }
        else if (qstype === 1) { this.c1.style.display = "block"; }
        else { this.c3.style.display = "block"; }
    }


    toLastQuestion = () => {
        this.props.goLastQst()
    }
    toNextQuestion = () => {
        this.props.goNextQst()
    }
    onChange = e => {
        this.props.onChange(e.target.value)
    };
    muxonChange = e => {
        this.props.muxonChange(e)
    }
    clickMark = ()=>{
        this.props.clickMark()
    }
    render() {
        const { qstit, qstype, opa, opb, opc, opd, ope, value, checkList, marked } = this.props;
        let qtype = ""
        if (qstype === 0)qtype = "判断题";else if (qstype === 1) qtype = "单选题";else qtype = "多选题";
        return (
            <>
                <div className="qst_main_box">
                    <LeftCircleTwoTone className='to_last_question' style={{ fontSize: '50px', cursor: 'pointer' }} onClick={this.toLastQuestion} />
                    <div className='qst_box'>
                        <div className='qsttitle'>
                            <Tag color="blue" className='qstypeTag'>{qtype}</Tag>
                            {qstit}
                        </div>
                        <div className='qstopts'>
                            <Radio.Group ref={c => this.c1 = c} onChange={this.onChange} value={value} style={{ display: 'none' }}>
                                <Space direction="vertical">
                                    <Radio value={1}>{opa}</Radio>
                                    <Radio value={2}>{opb}</Radio>
                                    <Radio value={3}>{opc}</Radio>
                                    <Radio value={4}>{opd}</Radio>
                                </Space>
                                <Button block onClick={this.clickMark}>{marked?"取消标记":"标记此题"}</Button>
                            </Radio.Group>
                            <Radio.Group ref={c => this.c2 = c} onChange={this.onChange} value={value} style={{ display: 'none' }}>
                                <Space direction="vertical">
                                    <Radio value={1}>对</Radio>
                                    <Radio value={2}>错</Radio>
                                </Space>
                                <Button block onClick={this.clickMark}>{marked?"取消标记":"标记此题"}</Button>
                            </Radio.Group>
                            <Checkbox.Group ref={c => this.c3 = c} onChange={this.muxonChange} value={checkList} style={{ display: 'none' }} defaultValue={[]}>
                                <Space direction="vertical">
                                    <Checkbox value={1}>{opa}</Checkbox>
                                    <Checkbox value={2}>{opb}</Checkbox>
                                    <Checkbox value={3}>{opc}</Checkbox>
                                    <Checkbox value={4}>{opd}</Checkbox>
                                    <Checkbox value={5}>{ope}</Checkbox>
                                </Space>
                                <Button block onClick={this.clickMark}>{marked?"取消标记":"标记此题"}</Button>
                            </Checkbox.Group>
                        </div>
                    </div>
                    <RightCircleTwoTone className='to_next_question' style={{ fontSize: '50px', cursor: 'pointer' }} onClick={this.toNextQuestion} />
                </div>
            </>
        )
    }
}
