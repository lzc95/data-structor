import React from 'react'
import {Select,Form, Input, Icon, Button,} from 'antd'

import './style.less'

const Option = Select.Option;
let id = 0;

class AddTask extends React.Component{
  constructor (props) {
    super (props)
    this.state={
      problem:[],
      optionA:[],
      optionB:[],
      optionC:[],
      data:[]
    }
  }
  
  handleChange(key,desc,data){
    
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
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
        {getFieldDecorator(`names[${k}]`, {
         
         
        })(
          <div>
            <span className="option">题 目:</span><Input placeholder="输入题目描述" 
            onChange={(v)=>this.handleChange(k,'P',v)}
            style={{ width: '60%', marginRight: 8 }} /><br/>
            <span className="option">选项A:</span><Input placeholder="选项A" style={{ width: '60%', marginRight: 8 }} /><br/>
            <span className="option">选项B:</span><Input placeholder="选项B" style={{ width: '60%', marginRight: 8 }} /><br/>
            <span className="option">选项C:</span><Input placeholder="选项C" style={{ width: '60%', }} /><br/>
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
        <Select style={{width:300}}>
          <Option key='0'>第一章</Option>
        </Select>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> 添加题目
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
 }

 export default Form.create({ name: 'dynamic_form_item' })(AddTask)