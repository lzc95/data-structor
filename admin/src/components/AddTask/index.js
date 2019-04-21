import React from 'react'
import {Select,Form, Input, Icon, Button,Radio,message} from 'antd'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import './style.less'

const Option = Select.Option;
const RadioGroup = Radio.Group;
let id = 0;

class AddTask extends React.Component{
  constructor (props) {
    super (props)
    this.state={
      chapter:[],
      data:[],
      selectedChapter: -1,
      title:''
    }
  }

  componentDidMount(){
    axios.get(URL.getChapter)
    .then(res=>{
      if(res.code == 0){
        this.setState({
          chapter:res.data
        })
      }
    })
  }
  
  selectChapter(value){
    this.setState({
      selectedChapter: value
    })
  }

  handelTitle(e){
    this.setState({
      title: e.target.value
    })
  }

  handleChange(key,desc,e){
    let data = this.state.data
    let value = e.target.value
    console.log(key,desc,value)
    if(!data[key]){
      data[key]={}
    }
    data[key] = Object.assign(data[key],{[desc]:value})
    this.setState({
      data
    })
  }


  remove = (k) => {
    console.log(k)
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    let data = this.state.data;
    data[k] = null;
    this.setState({
      data
    })
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = this.state.data.filter(item=>{
      return item != null
    })
    if(!!data.length){
      data = data.map(item=>{
        return JSON.stringify(item)
      })
      axios.post(URL.addPaper,{
        tId:this.state.selectedChapter,
        title:this.state.title,
        data:data.join('@@')
      }).then(res=>{
          if(res.code === 0){
            message.success('添加成功')
          }
      })
    } else {
      message.error('请添加试题')
    }
  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {... formItemLayoutWithOutLabel}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`)(
          <div>
            <span className="option">题 目:</span><Input placeholder="输入题目描述" 
            onChange={(e)=>this.handleChange(k,'problem',e)}
            style={{ width: '60%', marginRight: 8 }} /><br/>
            <span className="option">选项A:</span><Input placeholder="选项A" 
             onChange={(e)=>this.handleChange(k,'A',e)}
            style={{ width: '60%', marginRight: 8 }} /><br/>
            <span className="option">选项B:</span><Input placeholder="选项B"
             onChange={(e)=>this.handleChange(k,'B',e)}
             style={{ width: '60%', marginRight: 8 }} /><br/>
            <span className="option">选项C:</span><Input placeholder="选项C"
             onChange={(e)=>this.handleChange(k,'C',e)}
             style={{ width: '60%', }} /><br/>
            <span className="result">正确选项:</span>
             <RadioGroup onChange={(e)=>this.handleChange(k,'result',e)} >
                <Radio value={'A'}>A</Radio>
                <Radio value={'B'}>B</Radio>
                <Radio value={'C'}>C</Radio>
            </RadioGroup>
          </div>
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return(
      <div>
       
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <span style={{marginRight:10}}>请选择章节:</span>
            <Select style={{width:300}} placeholder="请选择章节" onChange={(value)=>this.selectChapter(value)}>  
              {
                this.state.chapter.length>0 && this.state.chapter.map(item=>{
                  return(
                      <Option key={item.id} value={item.id}>{item.title}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <span>试卷名称:</span>
            <Input style={{ width: '60%'}} onChange={(e)=>this.handelTitle(e)}/>
          </Form.Item>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '66%' }}>
              <Icon type="plus" /> 添加题目
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
 }

 export default Form.create({ name: 'dynamic_form_item' })(AddTask)