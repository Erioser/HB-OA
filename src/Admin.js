
import React from 'react'
import { Layout } from 'antd';
import connect from './modules/connect'
import LeftNav from './components/LeftNav'
import BreadCrumb from './components/BreadCrumb'
const { Header, Content, Footer, Sider } = Layout;


class Admin extends React.Component {
  state = {
    collapsed: false,
  };

  componentDidMount () {
      if ( !this.props.commons.menu_config ) {
          this.props.commons_actions.get_menu_config()
      }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" >HB-OA</div>
          <LeftNav  menu_config = { this.props.commons.menu_config } />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <BreadCrumb menu_config = { this.props.commons.menu_config } />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
               { this.props.children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default connect(Admin, 'commons')