import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { Upload, Form, Input, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { addcontestApi } from '../api/rqapi';
import './css/Addquestion.css'

export default class Changecontest extends Component {
  constructor(props){
    super(props);
    let that = this;
    this.aprops = {
      name: 'file',
      action: 'http://10.203.181.142:3000/addconqstbyexcel',
      headers: {
        authorization: 'authorization-text',
        chaptervalue: this.state.chaptervalue
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log(info.file.response);
          that.setState({tmtot:info.file.response.lenth,lastid:info.file.response.a})
          message.success(`题库已成功上传`);
        } else if (info.file.status === 'error') {
          message.error(`文件上传失败`);
        }
      },
    };
  }


  state = {go:false}


  onFormLayoutChange = (formvalue) => {
    this.setState({ ...formvalue })
  }
  sub1 = () => {
    const { contest_name, contest_time } = this.state;
    if (!contest_name||!contest_time) { message.warn('题目信息输入不完整！'); return; }
    if (/^\d+$/.test(contest_time) === false) { message.error('时间应该为纯数字！'); return; }
    addcontestApi(this.state)
    message.success('比赛添加成功')
    this.setState({go:true})
  }

  render() {
    return (
      <div>
        {this.state.go?<Navigate to="/admin/admincontests"/>:''}
          <div className='handinput'>
            <Form
              layout="horizontal"
              onValuesChange={this.onFormLayoutChange}
            >

              <Form.Item name="contest_name" style={{ width: 410 }}>
                <Input ref={c => this.c1 = c} placeholder='比赛名称' />
              </Form.Item>
              <Form.Item name="contest_time" style={{ width: 410 }}>
                <Input ref={c => this.c2 = c} placeholder='比赛时间(填分钟数)' />
              </Form.Item>
              <Upload {...this.aprops}>
                <Button icon={<UploadOutlined />}>选择要上传的题库文件</Button>
              </Upload>
              <Form.Item>
                <Button onClick={this.sub1}>确定添加竞赛</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
    )
  }
}


