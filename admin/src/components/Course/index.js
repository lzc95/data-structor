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
      visibleSectionForm: false,
      isAddChapter: true,
      chapterTitle:'',
      sectionTitle: '',
      sectionVideo:'',
      sectionDescription:'',
      fileList:[],
      chaperId: -1,
      sectionId:-1,
      dataTree:[],
     
    }
  }
  
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info.node.props);
    this.setState({
      sectionTitle:info.node.props.title.props.children[0]
    })
  }

  // 添加/修改一级目录
  saveChapter(){
    if(this.state.chaperId ==-1){
      // 添加
      axios.post(URL.addChapter, {
        title: this.state.chapterTitle
      }).then(res => {
        if (res.code == 0) {
          message.success('添加成功！')
          this.setState({
            visibleChapter: false
          })
          this.getDirectory()
        }
      })
    } else{
      // 修改
      axios.post(URL.editChapter, {
        id:this.state.chaperId,
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
  handleSectionDescription(e){
    this.setState({
      sectionDescription:e.target.value
    })
  }

  handleSectionVideo(e){
    this.setState({
      sectionVideo:e.target.value
    })
  }
  // 删除章节
  deleteChapter(id,title){
    const self  = this
    confirm({
      title: `确认要删除此章节(${title})内容么?`,
      content:'删除后不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        axios.post(URL.delChapter, {
          id: id
        }).then(res => {
          if (res.code == 0) {
            message.success('删除成功！')
            self.getDirectory()
          }
        })
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

  isShowSectionFormModal(s,id){
    this.setState({
      visibleSectionForm: s,
      sectionId:id
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
  saveSectionForm(){
    axios.post(URL.saveSectionForm, {
      tId: this.state.sectionId,
      title: this.state.sectionTitle,
      description: this.state.sectionDescription,
      video: this.state.sectionVideo,
      fileList: this.state.fileList

    }).then(res => {
      if (res.code == 0) {
        message.success('保存成功！')
        this.setState({
          visibleSectionForm: false
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
    const self =this
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
          console.log(info.file);
          let fileList = info.fileList.map(item=>{
            return item.response.file_path
          })

          self.setState({
            fileList
          })

          if(info.file.status == 'removed'){
            axios.post(URL.deleteCourseFile, {
              file_path:info.file.response.file_path
            }).then(res=>{
              if(res.code==0){
                message.success('delete successfully')
              }
            })
          }
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
          autoExpandParent={true}
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
                  <Icon type="delete" className="icon" onClick={() => this.deleteChapter(item.id, item.title)}/></span></span>} 
                  key={item.id}  selectable={false}
                >
                  {item.children && item.children.map((item_)=>{
                      return(
                        <TreeNode title={<span onClick={() => this.isShowSectionFormModal(true, item.id)}>{item_.title} <Icon type="edit" className="icon" /></span>} key={item_.id} ></TreeNode>
                      )
                    })
                  }
                </TreeNode>)
              })
            }
          </TreeNode>
        </Tree>

        {/* 小节详细信息 */}
        <Modal 
          visible={this.state.visibleSectionForm} 
          okText='保存'
          cancelText="取消"
          onOk={() => this.saveSectionForm()}
          onCancel={() => this.isShowSectionFormModal(false, -1)}>
          <Form >
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
              <Input.TextArea rows={6} value={this.state.sectionDescription} onChange={e => this.handleSectionDescription(e)}/>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="视频链接"
            >
              <Input value={this.state.sectionVideo} onChange={e => this.handleSectionVideo(e)}/>
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
          </Form>
        </Modal>

        {/* 添加章节目录 */}
        <Modal
          title={this.state.isAddChapter?'新增一章?':'修改章节名称'}
          visible={this.state.visibleChapter}
          okText='确认'
          cancelText="取消"
          onOk={() => this.saveChapter()}
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