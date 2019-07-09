import React, { Component, Fragment } from 'react';
import { Table, Divider } from 'antd';

const columns = [
  {
    title: 'Số điện thoại',
    dataIndex: 'SDT',
    key: 'SDT',
  },
  {
    title: 'Email',
    dataIndex: 'EMAIL',
    key: 'EMAIL',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'DIA_CHI',
    key: 'DIA_CHI',
  },
  {
    title: 'Họ',
    dataIndex: 'HO',
    key: 'HO',
  },
  {
    title: 'Tên',
    dataIndex: 'TEN',
    key: 'TEN',
  },
  {
    title: 'Họ tên',
    dataIndex: 'HO_TEN',
    key: 'HO_TEN',
  },
  {
    title: 'Nguồn',
    dataIndex: 'SOURCE_TEXT',
    key: 'SOURCE_TEXT',
  },
  {
    title: 'Nguồn (code)',
    dataIndex: 'SOURCE_CODE',
    key: 'SOURCE_CODE',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#edit">Edit</a>
        <Divider type="vertical" />
        <a href="#delete">Delete</a>
      </span>
    ),
  },
];

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
    };
  }

  async componentDidMount() {
    await this.fetchColumns();
    await this.fetchContacts();
  }

  fetchContacts = async () => {
    const url = 'http://localhost:5000/api/contacts';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      cache: 'no-cache',
    });
    const contacts = await response.json();

    const data = contacts.map(c => {
      const obj = {};
      c.forEach(element => {
        obj[element.name] = element.value;
      });

      return obj;
    });

    this.setState({ data: data });
  };

  fetchColumns = () => {
    this.setState({
      columns: columns,
    });
  };

  render() {
    return (
      <Fragment>
        <Table columns={this.state.columns} dataSource={this.state.data} rowKey="SDT" />
      </Fragment>
    );
  }
}
