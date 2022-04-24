import React, { Component } from 'react'
import { Collapse, Tag, Button } from 'antd';
import { Navigate } from 'react-router-dom';
import { confinstateApi } from '../api/rqapi';
import './css/Contests.css'

const { Panel } = Collapse;

export default class Adminstudents extends Component {


  state = { contests: [{ contest_name: '', 'count(*)': 0, 'avg(score)': 0, contest_id: 0 }],golist:false }
  constructor(props) {
    super(props)

    confinstateApi({}).then(res => {
      this.setState({ contests: res });
    })
  }

  seeList = (contest_id)=>{
    return ()=>{
      window.localStorage.setItem('contest_id',contest_id);
      this.setState({golist:true})
    }
  }

  render() {
    return (
      <>
      {this.state.golist?<Navigate to="/admin/finishedlist"></Navigate>:''}
      {/* (暂无一卡通号与学院对应关系，所以没有每个学院完成情况，只有全体完成情况) */}
        <Collapse accordion>
          {this.state.contests.map((item) => {
            return (
              <Panel header={item.contest_name} key={item.contest_id}>
                <div className="contest_info_box">
                  <div className='lft'>
                    <Tag color="purple">已完成人数</Tag>{item['count(*)']}人
                    &nbsp;&nbsp;
                    <Button type='primary' onClick={this.seeList(item.contest_id)}>查看已完成学生名单</Button>
                  </div>
                  <div className='rgt'>
                    <Tag color="geekblue">平均分数</Tag>{item['avg(score)']}分
                  </div>
                </div>
              </Panel>
            )
          })}
        </Collapse>
      </>
    )
  }
}


