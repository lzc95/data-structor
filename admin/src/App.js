import React from "react"
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Layout, Spin, Avatar,Icon,Message} from 'antd'
import classname from 'classname'
import logo from '@/assets/img/logo.svg'
import './App.css'
const { Header, Footer, Sider, Content } = Layout
import Login from '@/containers/login'
import SideMenu from '@/components/SideMenu'

import axios from '@/utils/axios'
import {setCurrentUser} from '@/actions'

class App extends React.Component{
  constructor (props){
    super(props)
    this.state={
      collapsed: false,
      loading:true,
      username:''
    }
  }
  // 侧边栏收起展开
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  logout = () => {
    axios.post('/api/logout',{type:1}).then(res=>{
      if(res.code == 0){
        this.props.logout({ status: false })
        window.location.reload()
      } else {
        Message.error(res.msg)
      }
    })
  }
  
  componentDidMount () {
    axios.post('/api/check',{type:1}).then(res => {
      this.setState({
        loading:false
      })
      if (res.code == 0){
        this.props.checkAuth({status:true})
        this.setState({
          username:Cookies.get('teacherName')
        })
      }
    }).catch(err => {
      this.setState({
        loading:false
      })
    })
  }

  render(){
    let {isLogin }= this.props
    if (this.state.loading) {
      return(
        <Spin spinning={this.state.loading} 
        tip="Loading..." 
        size="large"  className="spin"/>
      )
    }
    if (!isLogin) {
      return (
        <Login />
      )
    }

    const warp = classname({
      ContentContainer: true,
      close:this.state.collapsed
    })
    return(
      <Router>   
        <Layout >
          <Sider
            style={{ overflow: 'auto', height: '100vh',zIndex:100000, position: 'fixed', left: 0 }}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}>
            <img src={logo} className="logo" alt="logo" />
            {!this.state.collapsed && <span className="title">后台管理</span>}
            <SideMenu/>
          </Sider>
          <Layout>
            <Header style={{ position: 'fixed', zIndex:99999, width: '100%' }}>
              <div className="userInfo">
                <Avatar style={{ backgroundColor: '#87d068'}} icon="user" />
                <span>Hi,{this.state.username}</span>
                <span className="logout" onClick={this.logout}><Icon type="logout" />退出</span>
              </div> 
            </Header>
            <Content className={warp}>{this.props.children}</Content>
            {/* <Footer>Footer</Footer> */}
          </Layout>
        </Layout>
      </Router>
    )
   }
}

// *****很重要*****   子组件必须对context定义，否则 this.context 将是 empty object(但是慎用this.context)
// App.contextTypes={
//   store:PropTypes.object
// }
const mapStateToProps = (state) => {
  return{
    isLogin: state.auth.isAuthenticated
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    checkAuth: (status) =>{
      dispatch(setCurrentUser(status))
    },
    logout: (status) => {
      dispatch(setCurrentUser(status))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
