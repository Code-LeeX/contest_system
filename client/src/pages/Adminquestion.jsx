import React, { Component } from 'react'
import { List } from 'antd';
import { adminchsApi } from '../api/rqapi'

export default class Adminquestion extends Component {
  state = { upsed: false }
  constructor(props) {
    super(props)
    adminchsApi({}).then(res => {
      this.setState({
        ...res, data: [
          {
            title: '一、国家资助政策',
            idx: 0
          },
          {
            title: '二、征信、金融相关知识',
            idx: 1
          },
          {
            title: '三、贷款相关',
            idx: 2
          },
          {
            title: '四、金融诈骗',
            idx: 3
          },
          {
            title: '五、违法高利贷诈骗',
            idx: 4
          },
          {
            title: '六、电信诈骗',
            idx: 5
          },
          {
            title: '七、考风考纪',
            idx: 6
          },
        ], upsed: true
      })
    })
  }

  render() {
    return (
      this.state.upsed ? <List
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={`本章节共${this.state.tot[item.idx]}题，其中${this.state.tps[item.idx][0]}道判断题，${this.state.tps[item.idx][1]}道单选题，${this.state.tps[item.idx][2]}道多选题`}
            />
          </List.Item>
        )}
      /> : ''
    )
  }
}
