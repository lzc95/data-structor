import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Input,message } from 'antd'
import Editor from 'wangeditor'
import axios from '@/utils/axios'
import URL from '@/utils/url'
import parseQuery from '@/utils/parseQuery'
import classname from 'classname'
import './style.css'

message.config({
    top: 200,
    duration: 2,
    maxCount: 3
});

class AddArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            disabled: false,
            display:false
        }
    }

    back(){
        this.props.history.go(-1)
    }

    handleChange(e){
        this.setState({
            title: e.target.value 
        });
    }
    // 保存
    save() {
        axios.post(URL.saveNotice, this.state).then(res=>{
            let self =  this;
            if(res.code == 0){
                message.success('保存成功！')
                setTimeout(function(){
                    self.props.history.push('/notice') 
                },800)
                
            }
        }).catch(err=>{
            message.error(err);
            console.log(err);
        })
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new Editor(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                content: html
            })
        }
        editor.create()

        // 查看时
        let query = this.props.history.location.search;
        if(query){
            let data = parseQuery(query);
            this.setState({
                disabled:true,
                display:true
            })
            editor.$textElem.attr('contenteditable', false);
            axios.post(URL.viewNotice,{...data}).then(res=>{
                if(res.code == 0){
                    this.setState({
                        title:res.data.title,
                    })
                    editor.txt.html(res.data.content)
                }
            })    
        }
    }

   
    render() {
        const btn =classname({
            btn_operation: true,
            display:this.state.display
        })
        return (
            <div>
                <Button onClick={() => this.back()} className="back">返回</Button>
                <div>
                    标题：
                    <input className="content-item" value={this.state.title} onChange={e => this.handleChange(e)} disabled={this.state.disabled} />
                </div>
                <div ref="editorElem" className="editor" />
                <div className={btn}>
                    <Button>取消</Button>
                    <Button type="primary" onClick={() => this.save()}>保存</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(AddArticle);