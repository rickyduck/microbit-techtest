import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MonacoEditor from 'react-monaco-editor';

import FileList from '../../molecules/FileList';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row wrap',
    padding: 20,
    width: '100%'
  },
  files: {
    flex: 1,
    height: '100%',
    margin: 10,
    textAlign: 'center',
    padding: 10
  },
  editor: {
    height: '100%',
    flex: 4,
    margin: 10
  }
};

class FileEditor extends Component {
  constructor() {
    super();

    this.state = {
      code: ''
    };
    //this.handleMessage = this.handleMessage.bind(this);
    this.editorDidMount = this.editorDidMount.bind(this);
    this.loadCode = this.loadCode.bind(this);
    this.saveCode = this.saveCode.bind(this);
    this.downloadLink = React.createRef();
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  loadCode(code) {
    this.setState({ code });
  }
  saveCode() {
    const codeData = `${this.props.version}\n\r
      ${this.state.code}`;
    const a = this.downloadLink.current;
    a.href = window.URL.createObjectURL(
      new Blob([codeData], { type: 'text/plain' })
    );
    a.download = 'index.py';
    a.click();
  }
  render() {
    const code = this.state.code;
    const { classes } = this.props;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <section style={styles.container}>
        <div style={styles.files}>
          <FileList onLoad={this.loadCode} onSave={this.saveCode} />
        </div>
        <div style={styles.editor}>
          <MonacoEditor
            width="800"
            height="600"
            language="python"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={code => {
              this.setState({ code });
            }}
            editorDidMount={this.editorDidMount}
          />
        </div>

        <a style={{ visibility: 'hidden' }} ref={this.downloadLink} href="#" />
      </section>
    );
  }
}
FileEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FileEditor);
