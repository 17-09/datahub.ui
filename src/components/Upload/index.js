import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

import "./index.css";

export default class Upload extends PureComponent {
  render() {
    return (
      <Dropzone
        onDrop={this.props.onDrop}
        multiple={this.props.multiple}
        noClick={this.props.noClick}
        noKeyboard={this.props.noKeyboard}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
    );
  }
}
