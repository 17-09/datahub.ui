import React, { Component, Fragment } from 'react';
import { Row, Table, Button, Col } from 'antd';
// import { Statistic, Card, Row, Col, Table } from 'antd';
import { makeUrl } from 'config/root';
import filesize from 'filesize';
import Dropzone from 'react-dropzone';

import './index.css';

const accepts = ['.csv'];

export default class Files extends Component {
  state = {
    dataSource: [],
    columns: [
      {
        title: 'File Name',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: (text, record, index) => {
          return filesize(record.size);
        },
      },
      {
        title: 'Uploaded Date',
        dataIndex: 'lastModified',
        key: 'lastModified',
        defaultSortOrder: 'descend',
        sorter: (a, b) => {
          return Date.parse(a.lastModified) - Date.parse(b.lastModified);
        },
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
          return (
            <Button
              type="primary"
              icon="download"
              size="small"
              onClick={this.downloadFile(record.key)}
            >
              Download
            </Button>
          );
        },
      },
    ],
  };

  componentDidMount() {
    this.fetchDataSource();
  }

  fetchDataSource = async () => {
    const url = makeUrl('files');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify({
        bucketName: 'datahub69',
        maxKeys: 100,
      }),
    });

    const responseAsJson = await response.json();

    this.setState({ dataSource: responseAsJson });
  };

  downloadFile = key => async () => {
    const url = makeUrl(`files/${key}/download`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      cache: 'no-cache',
    });

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = key;
    a.click();
  };

  render() {
    return (
      <Fragment>
        {/* <Row gutter={16}>
          <Col span={3}>
            <Card size="small">
              <Statistic
                title={<strong>Upload</strong>}
                value={11}
                valueStyle={{ color: '#000000' }}
              />
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small">
              <Statistic
                title={<strong>Processing</strong>}
                value={11}
                valueStyle={{ color: '#CCCC00' }}
              />
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small">
              <Statistic
                title={<strong>Done</strong>}
                value={11}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small">
              <Statistic
                title={<strong>Fail</strong>}
                value={11}
                valueStyle={{ color: '#8B0000' }}
              />
            </Card>
          </Col>
        </Row>*/}
        <Row>
          <Col>
            <Dropzone onDrop={this.onDrop} accept={accepts} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <div>Kéo rồi thả file dữ liệu vào đây.</div>
                  <div>Hoặc nhấp chuột vị trí bất kỳ để mở hộp chọn file.</div>
                </div>
              )}
            </Dropzone>
          </Col>
        </Row>
        <Row>
          <Table
            dataSource={this.state.dataSource.s3Objects}
            columns={this.state.columns}
            pagination={{ position: 'bottom', pageSize: 100, size: 'small' }}
            title={() => (<strong>History</strong>)}
          />
        </Row>
      </Fragment>
    );
  }
}
