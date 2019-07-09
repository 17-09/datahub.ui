import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

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

  renderBreadcrumItems = () => {
    const menus = this.props.menus || [];
    const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((i, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url} onClick={this.onBreadcrumbSelect(url)}>
          <Link to={url}>{_.filter(menus, ['link', url])[0].name}</Link>
        </Breadcrumb.Item>
      );
    });

    const breadcrumbItems = [
      <Breadcrumb.Item key="1" onClick={this.onBreadcrumbSelect('/')}>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return breadcrumbItems;
  };

  render() {
    const home = _.filter(this.props.menus, ['home', true])[0];
    const breadcrumbItems = this.renderBreadcrumItems();

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

export default withRouter(LayoutBase);
