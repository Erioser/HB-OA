
import React, { Component } from 'react'
import './index.scss'
import connect from '../../modules/connect'
class WorkOverTime extends Component {
    // componentWillMount () {
    //     if ( this.props.commons.user_state.level < 7 ) {
    //         alert('没有权限')
    //         this.props.history.go(-1)
    //     }
    // }
    render () {
        return (
            <div className = "app-workovertime">
                Hello ,this is WorkOverTime!
            </div>
        )
    }

}

export default connect(WorkOverTime, 'commons')