import React from 'react'
import {Table,message, Icon,Modal} from 'antd'
import axios from '@/utils/axios'
import URL from '@/utils/url'

const confirm = Modal.confirm;

class Student extends React.Component{
  constructor (props) {
    super (props)
    this.state={
      data:[]
    }
  }

  del(id,name){
    const self = this;
    confirm({
      title: `确认要删除此学生(${name})信息?`,
      content:'删除后不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        axios.get(URL.delStudent,{
          params:{
            id:id
          }
        }).then(res=>{
          if(res.code == 0){
              message.success('删除成功')
              self.getStudent()
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  getStudent(){
      axios.get(URL.getStudent).then(res=>{
        if(res.data){
            this.setState({
              data:res.data
            })
        }
      })
  }

  componentDidMount(){
      this.getStudent()
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
                  <span style={{cursor:'pointer',color:'#1779FE'}}
                  onClick={()=>this.del(record.id, record.username)}>
                      <Icon type="delete" />删除
                  </span>
          )
      }
  ];
    return(
      <div>
        <Table 
            dataSource={this.state.data} 
            columns={columns} 
            pagination={false}
        />
      </div>
    )
  }
 }

 export default Student