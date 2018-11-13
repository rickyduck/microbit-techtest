import React, { Component } from 'react';
import FileEditor from './components/templates/FileEditor';
import ThemeBuilder from './theme/builder';
import './App.css';

function getThemeVersion() {
  const { search } = window.location;
  var versionToUse = '2.0';
  if (search) {
    versionToUse = search.split('=')[1];
  }
  return versionToUse;
}

class App extends Component {
  state = {
    version: getThemeVersion(),
    theme: new ThemeBuilder(getThemeVersion())
  };

  render() {
    return <FileEditor theme={this.state.theme} />;
  }
}

export default App;
