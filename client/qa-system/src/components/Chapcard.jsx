import React, {useRef} from 'react'
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/css/chapter.css'

const { Meta } = Card;


export default function Chapcard(props) {
    const { title, fin, tot, idx} = props;
    const btnRef = useRef()
    const navigate = useNavigate();
    const clickExercise = ()=>{
        window.localStorage.setItem('exercise_ch', idx);
        navigate('/exercise')
    }
    return (
        <div>
        {/* <div onMouseOver={omo} onMouseLeave={oml}> */}
            <Card style={{ marginTop: 5, height: 150 }} className='chcd'>
                <Meta
                    title={title}
                    description={`本章节共${tot}题，已完成${fin}题`}
                />
                <Button ref={btnRef} type="primary" block className='chbutton' onClick={clickExercise}>
                    去练习本章
                </Button>
            </Card>
        </div>
    )
}
