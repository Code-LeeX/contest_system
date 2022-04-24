import React, { Component } from 'react'
import { Upload, Form, Input, Button, InputNumber, message, Divider } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { addchqstApi } from '../api/rqapi';
import './css/Addquestion.css'


export default class AddQuestion extends Component {


  state = { chaptervalue: 1, qst_type: 0, qst_op3: null, qst_op4: null, qst_op5: null }

  hs = () => {
    return this.state.chaptervalue;
  }

  aprops = {
    name: 'file',
    action: 'http://10.203.181.142:3000/addchqstbyexcel',
    headers: {
      authorization: 'authorization-text',
      chaptervalue: 1
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`题库已成功上传至后台数据库`);
      } else if (info.file.status === 'error') {
        message.error(`文件上传失败`);
      }
    },
  };

  handleChange = (obj) => {
    // console.log(obj.target.value);
    this.setState({ chaptervalue: obj.target.value })
    this.aprops.headers.chaptervalue = obj.target.value
  }
  onFormLayoutChange = (formvalue) => {
    console.log(formvalue);
    if (formvalue.qst_score <= 0) { message.error('分值请设置为正数'); return; }
    this.setState({ ...formvalue })
  }
  sub1 = () => {
    const { qst_title, qst_op1, qst_op2, qst_ans, qst_teach, qst_score } = this.state;
    if (!qst_title || !qst_ans || !qst_op1 || !qst_op2 || !qst_teach || !qst_score) { message.warn('题目信息输入不完整！'); return; }
    addchqstApi(this.state)
    this.c1.input.value = ""; this.c2.input.value = ""; this.c3.input.value = ""; this.c4.input.value = ""; this.c5.input.value = ""; this.c6.input.value = ""; this.c7.input.value = ""; this.c8.input.value = "";
  }

  render() {
    return (
      <div>
        请选择要上传题目所属章节：<br />
        <select style={{ width: 239 }} onChange={this.handleChange}>
          <option value={1}>一、国家资助政策</option>
          <option value={2}>二、征信、金融相关知识</option>
          <option value={3}>三、贷款相关</option>
          <option value={4}>四、金融诈骗</option>
          <option value={5}>五、违法高利贷诈骗</option>
          <option value={6}>六、电信诈骗</option>
          <option value={7}>七、考风考纪</option>
        </select>
        <Divider />
        <div className="upld">
          <div className='handinput'>
            <Form
              layout="inline"
              onValuesChange={this.onFormLayoutChange}
            >
              <Form.Item name="qst_type" style={{ width: 200 }}>
                <select defaultValue="单项选择题">
                  <option value="0">判断题</option>
                  <option value="1">单项选择题</option>
                  <option value="2">多项选择题</option>
                </select>
              </Form.Item>
              <Form.Item style={{ width: 100 }} name="qst_score">
                <InputNumber placeholder='分值' />
              </Form.Item>
              <Form.Item name="qst_title" style={{ width: 410 }}>
                <Input ref={c => this.c1 = c} placeholder='请在此输入题目' />
              </Form.Item>
              <Form.Item name="qst_op1" style={{ width: 410 }}>
                <Input ref={c => this.c2 = c} placeholder='A选项' />
              </Form.Item>
              <Form.Item name="qst_op2" style={{ width: 410 }}>
                <Input ref={c => this.c3 = c} placeholder='B选项' />
              </Form.Item>
              <Form.Item name="qst_op3" style={{ width: 410 }}>
                <Input ref={c => this.c4 = c} placeholder='C选项' />
              </Form.Item>
              <Form.Item name="qst_op4" style={{ width: 410 }}>
                <Input ref={c => this.c5 = c} placeholder='D选项' />
              </Form.Item>
              <Form.Item name="qst_op5" style={{ width: 410 }}>
                <Input ref={c => this.c6 = c} placeholder='E选项' />
              </Form.Item>
              注：CDE选项可不填
              <Form.Item name="qst_ans" style={{ width: 410 }}>
                <Input ref={c => this.c7 = c} placeholder='正确答案' />
              </Form.Item>
              <Form.Item name="qst_teach" style={{ width: 410 }}>
                <Input ref={c => this.c8 = c} placeholder='解析' />
              </Form.Item>

              <Form.Item>
                <Button onClick={this.sub1}>添加题目</Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            <Upload {...this.aprops}>
              <Button icon={<UploadOutlined />}>选择要上传的题库文件</Button>
            </Upload>
          </div>
        </div>
      </div>
    )
  }
}


