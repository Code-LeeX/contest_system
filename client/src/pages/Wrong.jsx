import React, { Component } from 'react'
import { message, Progress } from 'antd';
import{Navigate} from 'react-router-dom'
import Question from '../components/Question';
import { getaqstApi, getwrongsApi, delwrongApi } from '../api/rqapi'
import './css/Wrong.css'


export default class Wrong extends Component {
  constructor(props) {
    super(props)
    this.state = { nowidx: 0, wrongs: [] , go:false,upsed:false, nodata:false }
    getwrongsApi({
      stu_id: window.localStorage.getItem('STU_id')
    }).then(res => {
      if(res.length<=0){this.setState({nodata:true});return;}
      this.setState({ wrongs: res }, () => {
        getaqstApi({
          ch_id: this.state.wrongs[this.state.nowidx]['ch_id'],
          qst_id: this.state.wrongs[this.state.nowidx]['qst_id']
        }).then(res => {
          this.setState({...res[0],upsed:true})
        })
      })
    })
  }
  goNextQst=()=>{
    this.setState({nowidx:this.state.nowidx+1},()=>{
      if(this.state.nowidx>=this.state.wrongs.length){this.setState({go:true});return;}
      getaqstApi({
        ch_id: this.state.wrongs[this.state.nowidx]['ch_id'],
        qst_id: this.state.wrongs[this.state.nowidx]['qst_id']
      }).then(res => {
        // console.log(res);
        this.setState(res[0])
      })
    })
  }

  goLastQst=()=>{
    if(this.state.nowidx<=0){message.info('当前已经是第1题了');return}
    this.setState({nowidx:this.state.nowidx-1},()=>{
      getaqstApi({
        ch_id: this.state.wrongs[this.state.nowidx]['ch_id'],
        qst_id: this.state.wrongs[this.state.nowidx]['qst_id']
      }).then(res => {
        // console.log(res);
        this.setState(res[0])
      })
    })
  }

  delThisWrong=()=>{
    delwrongApi({
        stu_id: window.localStorage.getItem('STU_id'),
        ch_id: this.state.wrongs[this.state.nowidx]['ch_id'],
        qst_id: this.state.wrongs[this.state.nowidx]['qst_id']
    })
    let newwrongs = this.state.wrongs;
    newwrongs.splice(this.state.nowidx,1)
    if(this.state.nowidx>=newwrongs.length){this.setState({go:true});message.success('错题都复习完啦');return;}
    getaqstApi({
      ch_id: newwrongs[this.state.nowidx]['ch_id'],
      qst_id: newwrongs[this.state.nowidx]['qst_id']
    }).then(res => {
      this.setState({...res[0],wrongs:newwrongs})
    })
  }

  render() {
    const { qst_title, qst_type, qst_op1, qst_op2, qst_op3, qst_op4, qst_op5, qst_teach, qst_ans } = this.state;
    let ans = qst_ans
    let longAns = '';
    if(ans){if(ans.search('A')>=0)longAns += qst_op1+' ';if(ans.search('B')>=0)longAns += qst_op2+' ';if(ans.search('C')>=0)longAns += qst_op3+' ';if(ans.search('D')>=0)longAns += qst_op4+' ';if(ans.search('E')>=0)longAns += qst_op5+' ';}
    return (
      <>
        <div className="wrongHeader">
          <Progress strokeLinecap="square" percent={this.state.nowidx/this.state.wrongs.length*100} showInfo={false} /><div>{`${this.state.nowidx+1}/${this.state.wrongs.length}`}</div>
        </div>
        {this.state.go?<Navigate to="/chapters"></Navigate>:''}
        {this.state.nodata ? <Navigate to="/nodata"></Navigate> : ''}
        {this.state.upsed?<Question qstit={qst_title} qstype={qst_type} opa={qst_op1} opb={qst_op2} opc={qst_op3} opd={qst_op4} ope={qst_op5} teach={qst_teach} ans={qst_ans} goNextQst={this.goNextQst} goLastQst={this.goLastQst} longAns={longAns} delThisWrong={this.delThisWrong}/>:''}
      </>
    )
  }
}
