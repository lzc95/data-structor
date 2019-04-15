import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import Course from '@/components/Course'
import Student from '@/components/Student'
import Task from '@/components/Task'
import Charts from '@/components/Charts'
import Notice from '@/components/Notice'
import AddNotice from '@/components/Notice/add'
import Account from '@/components/Account'
import NotFound from '@/components/NotFound'

class Routes extends React.Component{
  render () {
    return <Switch>
        <Route exact path="/" render={() => <Redirect to="/course" />} />
        <Route path="/course" component={Course} />
        <Route path="/student" component={Student} />
        <Route path="/task" component={Task} />
        <Route path="/notice" component={Notice} />
        <Route path="/addnotice" component={AddNotice} />
        <Route path="/viewnotice" component={AddNotice} />
        <Route path="/charts" component={Charts} />
        <Route path="/account" component={Account} />
        <Route component={NotFound} />
      </Switch>;
  }
}

export default Routes