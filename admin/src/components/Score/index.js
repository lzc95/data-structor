import React from 'react'
import axios from 'axios'
import {Select, Table} from 'antd'
import URL from '@/utils/url'

const Option = Select.Option;

class Score extends React.Component{
  constructor (props) {
    super (props)
    this.state={
        paper:[],
        defaultValue:-1,
        score:[]
    }
  }

  getAllPaperName(){
     axios.get(URL.getAllPaperName)
     .then(res=>{
        if(res.code == 0){
            this.setState({
              paper:res.data,
              defaultValue:res.data[0].id
            })
            this.getScore(res.data[0].id)
        }
     })
  }

  getScore(id){
    axios.get(URL.getScore,{
      params:{
        pId:id
      }
    }).then(res=>{
      if(res.code == 0){
        this.setState({
            score:res.data
        })
      }
    })
  }

  handleChange(v){
    this.setState({
      defaultValue:v
    })
    this.getScore(v)
  }

  componentDidMount(){
    this.getAllPaperName()
  }


  render () { 
    const columns = [{
      title: '学号',
      dataIndex: 'uName',
      key: 'uName',
    }, {
      title: '姓名',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: '成绩（正确率）',
      dataIndex: 'score',
      key: 'score',
      render: text => <a href="javascript:;">{text * 100}%</a>,
    }];
    return(
      <div>
        <Select value={this.state.defaultValue} style={{width:250,marginBottom:20}} onChange={(value)=>this.handleChange(value)}>
        {
          this.state.paper.map(item=>{
              return(
                <Option value={item.id} key={item.id}>{item.paper_title}</Option>
              )
          })
        }
          
        </Select>
        <Table  dataSource={this.state.score} columns={columns} pagination={false}/>
      </div>
    )
  }
 }

 export default Score;