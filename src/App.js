import React, { Component } from 'react';
import FileEditor from './components/templates/FileEditor';
import './App.css';

class App extends Component {
  state = { version: '2.0' };
  render() {
    return <FileEditor version={this.state.version} />;
  }
}

export default App;
