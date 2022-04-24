import React from 'react'
import { Navigate } from 'react-router-dom';
import { Collapse, Tag, Divider, Button } from 'antd';
import { ClockCircleOutlined, BarChartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getcontestsApi, getcontestinfoApi, delcontestApi } from '../api/rqapi';
import './css/Contests.css'

const { Panel } = Collapse;

export default class Admincontests extends React.Component {
  state = { contests: [{ info: [0, 0, 0, 0] }, { info: [0, 0, 0, 0] }], changecontest: false }
  constructor(props) {
    super(props)

    getcontestsApi({}).then(res => {
      let l = res.length;
      let mycontests = res.map(item => {
        getcontestinfoApi({ contest_id: item.contest_id }).then(res => { item.info = res; l--; })
        return item;
      })
      let timer = setInterval(() => {
        if (l <= 0) { this.setState({ contests: mycontests }); clearTimeout(timer); }
      }, 100);
    })
  }

  addcontest = () => {
    this.setState({ changecontest: true })
  }

  delContest = (contest_id) => {
    return () => {
      delcontestApi({ contest_id })
      window.location.reload()
    }
  }

  render() {
    return (
      <>
        <Collapse accordion>
          {this.state.contests.map((item) => {
            return (
              <Panel header={item.contest_name} key={item.contest_id}>
                <div className="contest_info_box">
                  <div className='lft'>
                    <Tag color="purple"><UnorderedListOutlined />&nbsp;题目总量</Tag>{item.info[3]}题
                  </div>
                  <div className='rgt'>
                    <Tag color="geekblue"><BarChartOutlined />&nbsp;题型分布</Tag>单项选择题:{item.info[1]} 判断题:{item.info[0]} 多项选择题:{item.info[2]}
                  </div>
                </div>
                <Divider />
                <div className="contest_info_box">
                  <div className='lft'>
                    <Tag color="red"><ClockCircleOutlined />&nbsp;时间限制</Tag>{item.contest_time}分钟
                  </div>
                  <div className='rgt'>
                    <Button onClick={this.delContest(item.contest_id)}>删除这场竞赛</Button>
                  </div>
                </div>
              </Panel>
            )
          })}
        </Collapse>
        <Divider />
        {this.state.changecontest ? <Navigate to="/admin/changecontest"></Navigate> : ''}
        <Button type='primary' onClick={this.addcontest}>添加一场竞赛</Button>
      </>
    )
  }
}
