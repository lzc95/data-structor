import React from 'react'
import axios from 'axios'
class Charts extends React.Component{
  constructor (props) {
    super (props)
  }
  componentDidMount(){
    axios.get('/api/getCharts').then(res=>{
      console.log(res)
    })
  }
  render () {
    return(
      <div>
        charts
      </div>
    )
  }
 }

 export default Charts