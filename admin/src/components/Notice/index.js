import React from 'react'
import { Button, Table, Divider, Icon, Pagination, message, Popconfirm, Modal, Radio,Input } from 'antd';
import { withRouter } from 'react-router-dom'
import axios from '@/utils/axios'
import URL from '@/utils/url'
import formateTime from '@/utils/formateTime'
import './style.css'

class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize:10,
            current:1,
            total: 0,
            dataSource: [],
            loading: false,
            visible: false, 
            isSendEmail: false, // 发布时是否发送电子邮件
        };
    }

    sizeChange=(current,pageSize)=>{
        this.setState({
            pageSize
        })
        let params = {
            current: this.state.current,
            pageSize: pageSize
        }
        this.getNoticeList(params)
    }

    pageChange(page){
        this.setState({
            current:page
        })
        let params = {
            current: page,
            pageSize: this.state.pageSize
        }
        this.getNoticeList(params)
    }

    addNotice() {
        this.props.history.push('/addnotice');
    }
    
    getNoticeList(params){
        this.setState({
            loading:true
        })
        axios.get(URL.getNoticeList, { params }).then(res => {
            if (res.code == 0) {
                this.setState({
                    dataSource: res.data,
                    total: res.total,
                    loading:false
                })
            }
        }, err => {
            console.log(err)
        })
    }
    view(id, create_time){
        this.props.history.push(`/viewnotice?id=${id}&create_time=${create_time}`);
    }
    
    del(id, create_time){
        axios.post(URL.delNotice, { id, create_time}).then(res=>{
            if(res.code == 0) {
                message.success('删除成功！')
                let params = {
                    current: this.state.current,
                    pageSize: this.state.pageSize
                }
                this.getNoticeList(params)
            } else{
                message.error('删除失败')
            }
        })
    }
    
    confirmSendEmail(e) {
        this.setState({
            isSendEmail: e.target.value,
        })
    }

    publish(){
        axios.post(URL.publishNotice, {isSendEmail:this.state.isSendEmail}).then(res=>{
            if(res.code == 0){
                this.isShowModal(false);
                message.success('发布成功')
            }
        }, err=>{

        })
    }
    
    isShowModal(s){
        this.setState({
            visible: s,
        })
    }
    componentDidMount() {
        let params = {
            current: this.state.current,
            pageSize: this.state.pageSize
        }
        this.getNoticeList(params)
    }

    render() {
        const columns = [
            {
                title:'#',
                dataIndex:'id',
                key:'id'
            },{
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:(text,record)=>{
                    return <span>{formateTime(record.create_time)}</span>;
                }
            }, {
                title: '操作',
                key: 'action',
                width: 360,
                render: (text, record) => (
                    <span>
                    <a href="javascript:;" onClick={()=>this.view(record.id, record.create_time)}>
                        <Icon type="eye" />
                        查看
                    </a>
                    <Divider type="vertical" />
                        <Popconfirm title="确认要删除么?" onConfirm={() => this.del(record.id, record.create_time)}>
                        <a href="javascript:;">
                            <Icon type="delete" />删除
                        </a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={()=>this.isShowModal(true)}>
                        <Icon type="pushpin" />
                        发布
                    </a>
                    <Divider type="vertical" />
                    <a href="javascript:;">
                        <Icon type="down-square" />
                        下架
                    </a>
                    </span>
                )
            }
        ];
        return (
            <div>
                <Button className="addBtn" onClick={() => this.addNotice()}>
                    新增+
                </Button>
                <p style={{ clear: 'right' }} />
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={columns} 
                    pagination={false} 
                    loading={this.state.loading}
                />
                <Pagination
                    style={{ textAlign: 'right', marginTop: '30px' }}
                    showSizeChanger
                    current={this.state.current}
                    total={this.state.total}
                    hideOnSinglePage={true}
                    onShowSizeChange={this.sizeChange}
                    onChange={(page)=>this.pageChange(page)}
                />

                {/* f发布通知确认模态框 */}
                <Modal
                    title="确认要发布这个通知么？"
                    visible={this.state.visible}
                    okText='确认'
                    cancelText="取消"
                    onOk={()=>this.publish()}
                    onCancel={()=>this.isShowModal(false)}
                >
                    <p>是否将该通知以邮件形式发送给学生</p>
                    <Radio.Group onChange={(e) => this.confirmSendEmail(e)} value={this.state.isSendEmail}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Notice)