import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '../../atoms/Button';
import Divider from '@material-ui/core/Divider';
import FileIcon from '@material-ui/icons/FileCopy';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import UploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class FileList extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.chooseFile = this.chooseFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  chooseFile() {
    this.fileInput.current.click();
  }

  uploadFile() {
    const reader = new FileReader();
    const file = this.fileInput.current.files[0];
    reader.readAsText(file, 'UTF-8');
    reader.onload = evt => {
      const content = evt.target.result;
      this.props.onLoad(content);
    };
  }
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <Button
            iconComponent={<FileIcon />}
            iconText="index.py"
            theme={theme}
          />
        </List>
        <Divider />
        <List component="nav">
          <Button
            iconComponent={<DownloadIcon />}
            iconText="Save File"
            onClick={this.props.onSave}
            theme={theme}
          />
          <Button
            iconComponent={<UploadIcon />}
            iconText="Open File"
            onClick={this.chooseFile}
            theme={theme}
          />
        </List>
        <input
          type="file"
          style={{ visibility: 'hidden' }}
          ref={this.fileInput}
          onChange={this.uploadFile}
        />
      </div>
    );
  }
}

FileList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FileList);
