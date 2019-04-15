import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import Course from '@/components/Course'
import Notice from '@/components/Notice'
import Person from '@/components/Person'
import Task from   '@/components/Task'
import NotFound from '@/components/NotFound'

class Routes extends React.Component{
  render () {
    return <Switch>
        <Route exact path="/" render={() => <Redirect to="/notice" />} />
        <Route path="/notice" component={Notice} />
        <Route path="/course" component={Course} />
        <Route path="/task" component={Task} />
        <Route path="/person" component={Person} />
        <Route component={NotFound} />
      </Switch>;
  }
}

export default Routes