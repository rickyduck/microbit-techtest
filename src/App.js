import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import openSocket from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const socket = openSocket('http://localhost:4000');

class App extends Component {
  constructor() {
    super();
    socket.on('connection', socket => {
      socket.on('message', msg => {
        console.log('message: ' + msg);
      });
    });
    this.state = {
      code: ''
    };
    socket.on('message', message => this.handleMessage(message));
    //this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.editorDidMount = this.editorDidMount.bind(this);
    this.textInput = React.createRef();
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  handleMessage(msg) {
    alert(msg);
  }
  sendMessage() {
    socket.emit('message', this.textInput.current.value);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          debugger;
          this.sendMessage();
        }}
      >
        <MonacoEditor
          width="800"
          height="600"
          language="python"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={() => false}
          editorDidMount={this.editorDidMount}
        />
        <input id="m" ref={this.textInput} />
        <button>Send</button>
      </form>
    );
  }
}

export default App;
