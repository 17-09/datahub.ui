import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { Layout, Menu, Icon } from 'antd';
import { Dropdown } from 'antd';

import Logo from 'components/PornLogo';

import './index.css';

const { Header, Content, Footer, Sider } = Layout;

class LayoutBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKey: [_.filter(props.menus, ['link', this.props.location.pathname])[0].key],
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onSelect = selectParams => {
    const { key } = selectParams;
    this.setState({
      selectedKey: [key],
    });
  };

  onBreadcrumbSelect = url => () => {
    const menus = this.props.menus || [];
    let key = _.filter(menus, ['link', url])[0].key;

    this.setState({
      selectedKey: [key],
    });
  };

  render() {
    const home = _.filter(this.props.menus, ['home', true])[0];

    const menu = (
      <Menu>
        <Menu.Item>
          {/* eslint-disable-next-line */}
          <a rel="noopener noreferrer" href="#">
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    const path = this.props.location.pathname;

    return (
      <div>
        <Layout id="mainLayout">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Link to="/" onClick={() => this.onSelect({ key: home.key })}>
              <div className="logo">
                {!this.state.collapsed ? (
                  <Logo leftText="admin" rightText="zero" />
                ) : (
                  <Icon type="home" />
                )}
              </div>
            </Link>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={this.state.selectedKey}
              style={{ lineHeight: '64px' }}
              onSelect={this.onSelect}
            >
              {this.props.menus.map(m => (
                <Menu.Item key={m.key}>
                  <Link to={m.link}>
                    <Icon type={m.icon} />
                    <span>{m.name}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header className="layoutHeader" style={{ background: '#fff', padding: 0 }}>
              <div className="leftHeader">
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </div>

              <div className="rightHeader">
                <Dropdown className="" overlay={menu} placement="bottomLeft" trigger={['click']}>
                  {/* eslint-disable-next-line */}
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="user" />
                  </a>
                </Dropdown>
              </div>
            </Header>
            <Content
              style={{
                margin: '0px 16px 16px 24px',
                // padding: '15px',
                background: '#fff',
                minHeight: 280,
              }}
            >
              {/* <div id="pageHeader" style={{ marginBottom: '10px' }}>
                <Breadcrumb className="app-breadcrumb">{breadcrumbItems}</Breadcrumb>
              </div> */}
              <div>
                <div className="contentTitle">
                  {_.filter(this.props.menus, ['link', path])[0].name}
                </div>
                <div>{this.props.children}</div>
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(LayoutBase);
