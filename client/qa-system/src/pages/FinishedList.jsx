import React from 'react'
import { List, Divider } from 'antd';
import { getfinlistApi } from '../api/rqapi';
import './css/FinishedList.css'

export default function FinishedList() {
    const [data, setData] = React.useState([])
    getfinlistApi({ contest_id: window.localStorage.getItem('contest_id') }).then(response => {
        setData(response);
    })
    return (
        <div className='finishedList_box'>
            <div className="finished_list">
                <div>一卡通号</div>
                <div>分数</div>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <div className="finished_list">
                                    <div>{item.stu_id}</div>
                                    <div>{item.score}</div>
                                </div>
                            }
                        />
                        <Divider />
                    </List.Item>
                )}
            />
        </div>
    )
}