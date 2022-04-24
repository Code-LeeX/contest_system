import React from 'react'
import { Tag } from 'antd';
import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import './css/css/question.css'


export default function QuestionAftCon(props) {

    let toLastQuestion = () => {
        props.goLastQst()
    }
    let toNextQuestion = () => {
        props.goNextQst()
    }
    let getqs_type = (qstype) => {
        if (qstype === 0) return "判断题";
        else if (qstype === 1) return "单选题";
        else return "多选题";
    }
    let getmyansSingle = (value, op1, op2, op3, op4) => {
        if (value === 1) return op1; else if (value === 2) return op2; else if (value === 3) return op3; else if (value === 4) return op4;
    }
    let getmyansMux = (checkList, op1, op2, op3, op4, op5) => {
        let res = '';
        for (let i = 0; i < checkList.length; i++) {
            let value = checkList[i];
            if (value === 1) res += op1 + ' '; else if (value === 2) res += op2 + ' '; else if (value === 3) res += op3 + ' '; else if (value === 4) res += op4 + ' '; else res += op5 + ' ';
        }
        return res;
    }
    let getrealansMux = (ans, op1, op2, op3, op4, op5)=>{
        let res = '';
        for (let i = 0; i < ans.length; i++) {
            let value = ans[i];
            if (value === 'A') res += op1 + ' '; else if (value === 'B') res += op2 + ' '; else if (value === 'C') res += op3 + ' '; else if (value === 'D') res += op4 + ' '; else res += op5 + ' ';
        }
        return res;
    }
    let getrealansSingle = (value, op1, op2, op3, op4)=>{
        if (value === 'A') return op1; else if (value === 'B') return op2; else if (value === 'C') return op3; else if (value === 'D') return op4;
    }


    const { qstit, qstype, teach, op1, op2, op3, op4, op5, value, checkList, ans } = props;
    let qs_type = getqs_type(qstype);
    let myans = qstype === 2 ? getmyansMux(checkList, op1, op2, op3, op4, op5) : getmyansSingle(value, op1, op2, op3, op4);
    let realans = qstype === 2 ? getrealansMux(ans, op1, op2, op3, op4, op5) : getrealansSingle(ans, op1, op2, op3, op4);
    return (
        <>
            <div className="qst_main_box">
                <LeftCircleTwoTone className='to_last_question' style={{ fontSize: '50px', cursor: 'pointer' }} onClick={toLastQuestion} />
                <div className='qst_box'>
                    <div className='qsttitle'>
                        <Tag color="blue" className='qstypeTag'>{qs_type}</Tag>
                        {qstit}
                    </div>
                    <div className='qstansw'>
                        <Tag color="cyan" >我的答案</Tag>{myans}
                        <br />
                        <Tag color="green" >正确答案</Tag>{realans}
                        <br />
                        <Tag color="red" >答案解析</Tag>{teach}
                    </div>
                </div>
                <RightCircleTwoTone className='to_next_question' style={{ fontSize: '50px', cursor: 'pointer' }} onClick={toNextQuestion} />
            </div>
        </>
    )

}
