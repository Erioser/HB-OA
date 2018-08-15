import  React, { Component } from 'react'

import { 
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'


import App from '../App'

import Admin from '../Admin'
import Home from '../pages/Home'
import Board from '../pages/Board'
import Attend from '../pages/Attend'
import WorkOverTime from '../pages/WorkOverTime'
import Login from '../pages/Login'

export default class extends Component {

    render () {
        return (
            <Router>              
                <App>
                    <Switch>
                        <Route path = "/login" component = {Login} />
                        <Route path = "/" render = {() => (
                            <Admin>
                                <Switch>
                                    <Route exact path = "/" component = { Home } />
                                    <Route path = "/board" component = { Board } />
                                    <Route path = "/attend/mine" component = { Attend } />
                                    <Route path = "/attend/leave-work" component = { WorkOverTime } />
                                </Switch>
                            </Admin>
                        )} />
                    </Switch>
                </App>
            </Router>
        )
    }

}