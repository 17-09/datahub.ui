import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { Col, Row, Button, Icon, Table } from 'antd';
import Papa from 'papaparse';
import { Spin, message } from 'antd';

import './index.css';

import { makeUrl } from 'config/root';

const accepts = ['.csv'];

export default class ImportFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      results: null,
      columns: [],
      data: [],

      spinning: false,
    };
  }

  onDrop = async files => {
    await this.setState({ file: files[0] });

    const config = {
      header: true,
      preview: 7,
      skipEmptyLines: true,
      complete: async results => {
        await this.setState({
          results,
          columns: this.buildColumns(results.meta.fields),
          data: results.data,
        });
      },
      encoding: 'utf-8',
    };

    Papa.parse(this.state.file, config);
  };

  buildColumns = columnNames => {
    return columnNames.map(n => {
      return {
        title: n,
        dataIndex: n,
        key: n,
      };
    });
  };

  onFileRemoval = () => {
    this.setState({
      file: null,
      results: null,
      columns: [],
      data: [],
    });
  };

  onSubmit = async () => {
    await this.setState({
      spinning: true,
    });
    try {
      const url = makeUrl('files');
      const formData = new FormData();
      formData.append('file', this.state.file);

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      message.success("Upload file thành công!");
    } finally {
      await this.setState({
        spinning: false,
      });
    }
  };

  render() {
    const { file } = this.state;
    return (
      <Spin spinning={this.state.spinning}>
        <Fragment>
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

          {file == null ? null : (
            <Fragment>
              <Row>
                <Col span={14}>
                  <strong>{file.path}</strong>
                </Col>
                <Col span={4}>{file.size / 1000000} MB</Col>
                <Col span={4}>
                  <Icon type="delete" onClick={this.onFileRemoval} />
                </Col>
              </Row>

              <Row>
                <Table
                  title={() => 'Preview'}
                  dataSource={this.state.data}
                  columns={this.state.columns}
                  scroll={{ x: true }}
                  pagination={false}
                  rowKey="SDT"
                />
              </Row>
              <Row style={{ paddingTop: '10px' }}>
                <Col>
                  <Button type="primary" size="large" onClick={this.onSubmit}>
                    Gửi đi
                  </Button>
                </Col>
              </Row>
            </Fragment>
          )}
        </Fragment>
      </Spin>
    );
  }
}
