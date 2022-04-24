import React from 'react'
import { Navigate } from 'react-router-dom';
import { Collapse, Tag, Divider, Button } from 'antd';
import { ClockCircleOutlined, BarChartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getcontestsApi, getcontestinfoApi } from '../api/rqapi';
import './css/Contests.css'

const { Panel } = Collapse;

export default class Contests extends React.Component {
  state = { contests: [{ info: [0, 0, 0, 0] }, { info: [0, 0, 0, 0] }], incontest: false }
  constructor(props) {
    super(props)

    getcontestsApi({}).then(res => {
      let l = res.length;
      let mycontests = res.map(item => {
        getcontestinfoApi({ contest_id: item.contest_id }).then(res => { item.info = res; l--; })
        return item;
      })
      // while(true){
      //   if(l>0) continue;
      //   else {this.setState({ contests: mycontests});break;}
      // }
      let timer = setInterval(() => {
        if (l <= 0) { this.setState({ contests: mycontests }); clearTimeout(timer); }
      }, 100);
    })
  }

  joinContest = (contest_id,time) => {
    return () => {
      window.localStorage.setItem('contest_id',contest_id)
      window.localStorage.setItem('timeLimit',time)
      this.setState({ incontest: true });
    }
  }

  render() {
    return (
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
                  <Button onClick={this.joinContest(item.contest_id,item.contest_time)}>参加竞赛</Button>
                  {this.state.incontest ? <Navigate to="/incontest"></Navigate> : ''}
                </div>
              </div>
            </Panel>
          )
        })}
      </Collapse>
    )
  }
}
