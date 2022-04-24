import React from 'react'
import { Col, Row } from 'antd';
import Chapcard from '../components/Chapcard';
import store from '../store/index';
import { chfinApi } from '../api/rqapi'
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


export default class Chapters extends React.Component {
  constructor(props) {
    super(props);
    let sdid = window.localStorage.getItem('STU_id')
    if (sdid == null)
      this.state = { stu_card_id: store.getState(), tot: [0, 0, 0, 0, 0, 0, 0], fin: [0, 0, 0, 0, 0, 0, 0] }
    else
      this.state = { stu_card_id: sdid, tot: [0, 0, 0, 0, 0, 0, 0], fin: [0, 0, 0, 0, 0, 0, 0] }
    // // 监听store变化
    // store.subscribe(this.handleStoreChange);
  }

  componentDidMount() {
    chfinApi({
      stu_id: this.state.stu_card_id
    }).then(res => {
      this.setState({ tot: res.tot, fin: res.fin }, () => { console.log(this.state); })
    })
  }

  render() {
    // if (this.state.stu_card_id === 0) {
    //   let sdid = window.localStorage.getItem('STU_id')
    //   if (sdid == null)
    //     this.setState({ stu_card_id: store.getState()})
    //   else
    //     this.setState({ stu_card_id: sdid})
    // }
    // chfinApi({
    //   stu_id: this.state.stu_card_id
    // }).then(res => {
    //   console.log(res);
    //   this.setState({ tot: res.tot, fin: res.fin }, () => { console.log(this.state); })
    // })
    const finn = this.state.fin;
    const totn = this.state.tot;
    return (
      <div className='aChapter'>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Chapcard title="一、国家资助政策" fin={finn[0]} tot={totn[0]} idx={1} />
            </Col>
            <Col span={8}>
              <Chapcard title="二、征信、金融相关知识" fin={finn[1]} tot={totn[1]} idx={2} />
            </Col>
            <Col span={8}>
              <Chapcard title="三、贷款相关" fin={finn[2]} tot={totn[2]} idx={3} />
            </Col>
          </Row>


          <Row gutter={16}>
            <Col span={8}>
              <Chapcard title="四、金融诈骗" fin={finn[3]} tot={totn[3]} idx={4} />
            </Col>
            <Col span={8}>
              <Chapcard title="五、违法高利贷诈骗" fin={finn[4]} tot={totn[4]} idx={5} />
            </Col>
            <Col span={8}>
              <Chapcard title="六、电信诈骗" fin={finn[5]} tot={totn[5]} idx={6} />
            </Col>
          </Row>


          <Row gutter={16}>
            <Col span={8}>
              <Chapcard title="七、考风考纪" fin={finn[6]} tot={totn[6]} idx={7} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

