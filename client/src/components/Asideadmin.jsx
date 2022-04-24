import React,{useEffect, useState} from 'react'
import { Menu } from 'antd';
import {CloudUploadOutlined, PieChartOutlined, AlignLeftOutlined, DiffOutlined} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/css/aside.css'

export default function Aside() {
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultKey,setDefaultKey] = useState('')

    useEffect(()=>{
        let path = location.pathname;
        let firstFloorRouter = path.split('/')[2];
        if(firstFloorRouter==='changecontest') firstFloorRouter='admincontests';
        if(firstFloorRouter==='finishedlist') firstFloorRouter='adminstudents';
        setDefaultKey(firstFloorRouter);
    },[location.pathname])

    const handleClick = e => {
        navigate('/admin/'+e.key);
        setDefaultKey(e.key);
    };

    return (
        <div>
            <Menu
                onClick={handleClick}
                style={{ width: 200 }}
                selectedKeys={[defaultKey]}
                mode="inline"
                theme='dark'
                className='aside'
            >
            <Menu.ItemGroup key="g1" title="信息统计">
                <Menu.Item key="adminstudents"><PieChartOutlined />&nbsp;用户统计</Menu.Item>
                <Menu.Item key="adminquestion"><AlignLeftOutlined />&nbsp;题库信息</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="题目管理">
                <Menu.Item key="addquestion"><CloudUploadOutlined />&nbsp;章节题库</Menu.Item>
                <Menu.Item key="admincontests"><DiffOutlined />&nbsp;竞赛管理</Menu.Item>
            </Menu.ItemGroup>
            </Menu>
        </div>
    )
}
