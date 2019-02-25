import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import Course from '@/components/Course'
import Category from '@/components/Category'
import Tags from '@/components/Tags'
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
        <Route path="/category" component={Category} />
        <Route path="/tags" component={Tags} />
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