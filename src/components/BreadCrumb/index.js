
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
class BreadCrumb extends Component {
    constructor (props) {
        super(props)
        this.renderItems = this.renderItems.bind(this)
    }
    renderItems () {
        let { pathname } = this.props.location
        let { menu_config } = this.props
        if ( !menu_config ) return ''
        let items = [(<Breadcrumb.Item key={'/'}>
                        <Link to={'/'}>后台首页</Link>
                    </Breadcrumb.Item>)]

        if (pathname !== '/' ) {
            pathname = pathname.substr(1)
            let arr = pathname.split('/')
            // 'attend' 'mine'     
            arr.forEach((item, i) => {
               
                let path = i > 0 ? `/${arr[i-1]}/${item}` : `/${item}`
                
                items.push(
                    <Breadcrumb.Item key={path}>
                        { i > 0 ? <Link to={path}>{ item }</Link> : item }
                    </Breadcrumb.Item>
                )
            });
        }

        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                { items }
            </Breadcrumb>
        )
    }
    render () {
        return (
            <div className = "bread-crumb">
                { this.renderItems() }
            </div>
        )
    }

}

export default withRouter(BreadCrumb)