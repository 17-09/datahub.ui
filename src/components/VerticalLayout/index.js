import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';

import './index.css';
import logo from '../../../src/logo.png';

const { Header, Content, Footer, Sider } = Layout;

const breadcrumbNameMap = {
  '/': 'Dashboard',
  '/files': 'Import File',
  '/fields': 'Fields',
  '/contacts': 'Contacts',
};

const menuIndexMap = {
  '/': '1',
  '/files': '2',
  '/fields': '3',
  '/contacts': '4',
};

class VerticalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKey: [menuIndexMap[this.props.location.pathname]],
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
    let key = menuIndexMap[url];

    this.setState({
      selectedKey: [key],
    });
  };

  renderBreadcrumItems = () => {
    let pathSnippets = this.props.location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url} onClick={this.onBreadcrumbSelect(url)}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });

    if (_.isEmpty(extraBreadcrumbItems))
      return (
        <Breadcrumb.Item key="1" onClick={this.onBreadcrumbSelect('/')}>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
      );

    return extraBreadcrumbItems;
  };

  renderMenus = () => {
    const dashboard = (
      <Menu.Item key="1">
        <Link to="/">
          <Icon type="dashboard" />
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
    );
    const dataHubs = (
      <Menu.Item key="2">
        <Link to="/files">
          <Icon type="code-sandbox" />
          <span>Import Files</span>
        </Link>
      </Menu.Item>
    );
    const fields = (
      <Menu.Item key="3">
        <Link to="/fields">
          <Icon type="code-sandbox" />
          <span>Fields</span>
        </Link>
      </Menu.Item>
    );
    const contacts = (
      <Menu.Item key="4">
        <Link to="/contacts">
          <Icon type="code-sandbox" />
          <span>Contacts</span>
        </Link>
      </Menu.Item>
    );
    return [dashboard, dataHubs, fields, contacts];
  };

  render() {
    const breadcrumbItems = this.renderBreadcrumItems();

    return (
      <div>
        <Layout id="mainLayout">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Link to="/">
              <div className="logo">
                <img className="logo" src={logo} alt="data hub" style={{ margin: '0 auto' }} />
              </div>
            </Link>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={this.state.selectedKey}
              style={{ lineHeight: '64px' }}
              onSelect={this.onSelect}
            >
              {this.renderMenus()}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <div id="pageHeader" style={{ marginBottom: '10px' }}>
                <Breadcrumb className="app-breadcrumb">{breadcrumbItems}</Breadcrumb>
              </div>
              {this.props.children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(VerticalLayout);
