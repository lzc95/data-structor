import { message} from 'antd'
import { connect } from "react-redux"
import axios from '@/utils/axios'
import LoginComponent  from '@/components/Login'
import {setCurrentUser} from '@/actions'



const mapStateToProps = (state) => {
  console.log(state)
  return state
}

const mapDispatchToProps = (dispatch) => {
  return{
    handleLogin: (user) =>{
        axios.post('/api/login', user).then(res => {
        console.log(res)
        if (res.code == 0) {
          window.location.reload()
          dispatch(setCurrentUser({status:true}))
        } else {
          message.error(res.msg);
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

export default Login;