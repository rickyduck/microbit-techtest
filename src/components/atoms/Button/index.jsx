import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const Button = props => {
  return (
    <ListItem
      style={{ backgroundColor: props.theme.theme.buttonColour }}
      button
      onClick={props.onClick}
    >
      <ListItemIcon>{props.iconComponent}</ListItemIcon>
      <ListItemText primary={props.iconText} />
    </ListItem>
  );
};

export default Button;
