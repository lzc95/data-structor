import React from 'react'
import {withRouter} from 'react-router-dom'
import {Tree, Icon, Modal,Input,Form,Upload,Button,message} from 'antd'
import classname from 'classname'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import './style.css'

const { TreeNode } = Tree;
const confirm = Modal.confirm;


class Course extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleChapter: false,
      visibleSection: false,
      isAddChapter: true,
      chapterTitle:'',
      sectionTitle: '',
      chaperId: -1,
      dataTree:[]
    }
  }
  
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info.node.props);
    this.setState({
      sectionTitle:info.node.props.title.props.children
    })
  }
  // 添加一级目录
  addChapter(){
    axios.post(URL.saveChapter, {
      title: this.state.chapterTitle
    }).then(res => {
      if (res.code == 0) {
        message.success('保存成功！')
        this.setState({
          visibleChapter: false
        })
        this.getDirectory()
      }
    })
  }

  editChapter(){
    
  }

  handleChapter(e){
    this.setState({
      chapterTitle: e.target.value
    });
  }

  handleSection(e){
    this.setState({
      sectionTitle:e.target.value
    })
  }

  deleteChapter(id,name){
    console.log(id)
    confirm({
      title: `确认要删除此章节(${name})内容么?`,
      content:'删除后不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  isShowChapterModal(s,v,cId,cTitle){
    if (cId) {
      this.setState({
        chapterTitle: cTitle,
        chaperId: cId
      })
    }
    if(!v){
      this.setState({
        chapterTitle:''
      })
    }
    this.setState({
      isAddChapter: s,
      visibleChapter: v
    })
  }

  isShowSectionModal(s,id){
    this.setState({
      visibleSection: s,
      chaperId:id
    })
  }

  addSection(){
    axios.post(URL.addSection, {
      parent_id: this.state.chaperId,
      title: this.state.sectionTitle
    }).then(res => {
      if (res.code == 0) {
        message.success('保存成功！')
        this.setState({
          visibleSection: false
        })
        this.getDirectory()
      }
    })
  }
  
  getDirectory(){
    axios.get(URL.getDirectory).then(res => {
      console.log(res.data)
      this.setState({
        dataTree: res.data
      })
    })
  }
  componentDidMount() {
    this.getDirectory()
  }
  
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const uploadprops = {
      name: 'file',
      action: URL.uploadCourseFile,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className="tree-wrap">
        <Tree
          showLine
          defaultExpandAll={true}
          onSelect={this.onSelect}
        >
          <TreeNode 
            title={<span className="root-container">《数据结构》 <Icon type="plus-circle" className="root-operation" onClick={() => this.isShowChapterModal(true,true)} /></span>} 
            key="0" selectable={false}>
            {
              this.state.dataTree.map((item, index) => {
              return (
                <TreeNode
                  title={<span className="parent-container">{item.title} <span className="parent-operation">
                  <Icon type="plus-circle" className="icon" onClick={() => this.isShowSectionModal(true,item.id)}/>
                  <Icon type="edit" className="icon" onClick={() => this.isShowChapterModal(false, true, item.id, item.title)}/>
                  <Icon type="delete" className="icon" onClick={() => this.deleteChapter(item.id,item.name)}/></span></span>} 
                  key={item.id}  selectable={false}
                >
                  {item.children && item.children.map((item_)=>{
                      return(
                        <TreeNode title={<span>{item_.title}</span>} key={item_.id} ></TreeNode>
                      )
                    })
                  }
                </TreeNode>)
              })
            }
          </TreeNode>
        </Tree>

        {/* 小节详细信息 */}
        <Form className="sectionForm" >
          <Form.Item
            {...formItemLayout}
            label="标题"
          > 
            <Input value={this.state.sectionTitle} onChange={e => this.handleSection(e)}/>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="简介"
          >
            <Input.TextArea rows={6}/>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="视频链接"
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="课件资料"
          >
            <Upload {...uploadprops}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form>

        {/* 添加章节目录 */}
        <Modal
          title={this.state.isAddChapter?'新增一章?':'修改章节名称'}
          visible={this.state.visibleChapter}
          okText='确认'
          cancelText="取消"
          onOk={() => this.addChapter()}
          onCancel={() => this.isShowChapterModal(false)}
        >
          <Input placeholder="输入名称" value={this.state.chapterTitle} onChange={e => this.handleChapter(e)}/>
        </Modal>

        {/* 添加小节目录 */}
        <Modal
          title="新增一节？"
          visible={this.state.visibleSection}
          okText='确认'
          cancelText="取消"
          onOk={() => this.addSection()}
          onCancel={() => this.isShowSectionModal(false)}
        >
          <Input placeholder="输入名称" value={this.state.sectionTitle} onChange={e => this.handleSection(e)} />
        </Modal>
      </div>
    );
  }
  
 }

export default withRouter(Course)