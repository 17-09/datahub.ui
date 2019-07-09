import React, { Component, Fragment } from 'react';
import { Table, Divider } from 'antd';

const columns = [
  {
    title: 'Field',
    dataIndex: 'fieldCode',
    key: 'fieldCode',
  },
  {
    title: 'Tên ngắn',
    dataIndex: 'fieldName',
    key: 'fieldName',
  },
  {
    title: 'Mô tả',
    dataIndex: 'fieldDisplay',
    key: 'fieldDisplay',
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

const data = [
  {
    key: 'SDT',
    fieldCode: 'SDT',
    fieldName: 'Số điện thoại',
    fieldDisplay: 'Số điện thoại',
  },
  {
    key: 'email',
    fieldCode: 'EMAIL',
    fieldName: 'Email',
    fieldDisplay: 'Email chính',
  },
  {
    key: 'DIA_CHI',
    fieldCode: 'DIA_CHI',
    fieldName: 'Địa chỉ',
    fieldDisplay: 'Địa chỉ',
  },
  {
    key: 'HO',
    fieldCode: 'HO',
    fieldName: 'Họ',
    fieldDisplay: 'Ví dụ: Nguyễn Văn, Nguyễn Thanh, Phạm Hoàng.',
  },
  {
    key: 'TEN',
    fieldCode: 'TEN',
    fieldName: 'Tên',
    fieldDisplay: 'Tên (một chữ cái, không phải họ và tên). Ví dụ: Tuyền, Thái.',
  },
  {
    key: 'HO_TEN',
    fieldCode: 'HO_TEN',
    fieldName: 'Họ và tên',
    fieldDisplay: 'Họ và tên đầy đủ. Ví dụ: Nguyễn Thanh Tuyền, Phạm Hoàng Thái',
  },
  {
    key: 'SOURCE_CODE',
    fieldCode: 'SOURCE_CODE',
    fieldName: 'Nguồn (code)',
    fieldDisplay: 'Nguồn (chi tiết)',
  },
  {
    key: 'SOURCE_TEXT',
    fieldCode: 'SOURCE_TEXT',
    fieldName: 'Nguồn (chi tiết)',
    fieldDisplay: 'Nguồn (chi tiết)',
  },
  {
    key: 'NGAY_TAO',
    fieldCode: 'NGAY_TAO',
    fieldName: 'Ngày tạo',
    fieldDisplay: 'Ngày tạo (ngày thu thập dữ liệu)',
  },
];

export default class Field extends Component {
  render() {
    return (
      <Fragment>
        <Table columns={columns} dataSource={data} />
      </Fragment>
    );
  }
}
