import React from 'react'
import {Collapse,Icon,message,Modal} from 'antd'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import Paper from './paper'

const Panel = Collapse.Panel;
const confirm = Modal.confirm;

class Task extends React.Component{
  constructor (props) {
    super (props)
    this.state={
      paperData:[],
      isShowPaperInfo:false,
      paperId:-1,
      paperTitle:''
    }
  }

  getAllPaper(){
    axios.get(URL.getAllPaper)
    .then(res=>{
        if(res.code == 0){
            this.setState({
                paperData:res.data
            })
        }
    })
  }

  delPapder(id){
    const self = this;
    confirm({
      title: '确认要删除这份测试题吗?',
      content:'删除后不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        axios.get(URL.delPaper,{
          params:{
            id:id
          }
        }).then(res=>{
          if(res.code == 0){
              message.success('删除成功')
              self.getAllPaper()
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  viewPaper(id,title){
    this.setState({
      isShowPaperInfo:true,
      paperId:id,
      paperTitle:title
    })
  }

  gokPaperList(){
    this.setState({
      isShowPaperInfo:false
    })
  }
  
  componentDidMount(){
      this.getAllPaper()
  }

  render () {
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };

    return(
      <div>
        {!this.state.isShowPaperInfo && this.state.paperData.map((item, index)=>{
            return(
              <Collapse
              bordered={false}
              defaultActiveKey={['0']}
              key={index.toString()}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel header={item.title} key={index} style={customPanelStyle}>
                  {
                    item.children.map(v=>{
                      return(
                        <div key={v.id} style={{height:40}}>
                          <Icon type="file" style={{marginRight:10,marginLeft:20}}/>
                          <span >{v.paper_title}</span>
                          <span style={{float:'right',marginRight:60}}>
                            <span style={{marginLeft:20,cursor:'pointer'}}
                            onClick={()=>this.viewPaper(v.id,v.paper_title)}><Icon type="eye" />查看</span>
                            <span style={{marginLeft:20,cursor:'pointer'}}
                            onClick={()=>this.delPapder(v.id)}><Icon type="delete"/>删除</span>
                          </span>
                        </div>
                      )
                    })
                  }
                </Panel>
            </Collapse>
            )
        })
        }  

        {
            this.state.isShowPaperInfo && 
            <Paper 
            id={this.state.paperId}
            title={this.state.paperTitle}
            gokPaperList={()=>this.gokPaperList()}
            />
        }
      </div>
    )
  }
 }

 export default Task