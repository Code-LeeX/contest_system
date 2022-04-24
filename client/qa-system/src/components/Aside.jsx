import React,{useEffect, useState} from 'react'
import { Menu } from 'antd';
import {GoldenFilled, ProfileFilled, BulbFilled} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/css/aside.css'

export default function Aside() {
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultKey,setDefaultKey] = useState('')

    useEffect(()=>{
        let path = location.pathname;
        let firstFloorRouter = path.slice(1);
        if(firstFloorRouter==='exercise') firstFloorRouter='chapters';
        if(firstFloorRouter==='incontest') firstFloorRouter='contests';
        setDefaultKey(firstFloorRouter);
    },[location.pathname])

    const handleClick = e => {
        navigate('/'+e.key);
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
            <Menu.ItemGroup key="g1" title="题库">
                <Menu.Item key="chapters"><ProfileFilled />&nbsp;章节训练</Menu.Item>
                <Menu.Item key="wrong"><BulbFilled />&nbsp;错题练习</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="竞赛">
                <Menu.Item key="contests"><GoldenFilled />&nbsp;参加竞赛</Menu.Item>
            </Menu.ItemGroup>
            </Menu>
        </div>
    )
}
