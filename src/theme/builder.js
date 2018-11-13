export default class ThemeBuilder {
  theme = {
    version: '2.0',
    buttonColor: ''
  };
  versions = [
    {
      version: '2.0',
      buttonColour: 'green'
    },
    {
      version: '1.1',
      buttonColour: 'pink'
    },
    {
      version: '1.0',
      buttonColour: 'red'
    }
  ];
  constructor(version) {
    this.setVersion(version);
  }
  setVersion(version) {
    const theme = this.versions.filter(versionObj => {
      return versionObj.version === version;
    })[0];
    this.theme = theme;
  }
}
