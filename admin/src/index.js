import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import 'antd/dist/antd.css'
import App from '@/App'
import Routes from '@/router'
import rootReducer from '@/reducers'

const store = createStore(rootReducer,applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Routes/>
    </App>
  </Provider>,
  document.getElementById('root')
)