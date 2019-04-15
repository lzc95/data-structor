import React from 'react'
import {Table,Popconfirm, Icon,} from 'antd'
import axios from '@/utils/axios'
import URL from '@/utils/url'

class Student extends React.Component{
  constructor (props) {
    super (props)
    this.state={
      data:[]
    }
  }

  del(){

  }

  componentDidMount(){
    axios.get(URL.getStudent).then(res=>{
        if(res.data){
          this.setState({
            data:res.data
          })
        }
      }
    )
  }

  render () {
    const columns = [
      {
          title:'#',
          dataIndex:'id',
          key:'id'
      },{
          title: '学生账号',
          dataIndex: 'username',
          key: 'username'
      },{
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
      },{
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
      },{
          title: '操作',
          key: 'action',
          width: 360,
          render: (text, record) => (
              <span>
                  <Popconfirm title="确认要删除么?" onConfirm={() => this.del()}>
                  <a href="javascript:;">
                      <Icon type="delete" />删除
                  </a>
              </Popconfirm>
              </span>
          )
      }
  ];
    return(
      <div>
        <Table 
            dataSource={this.state.data} 
            columns={columns} 
            
        />
      </div>
    )
  }
 }

 export default Student