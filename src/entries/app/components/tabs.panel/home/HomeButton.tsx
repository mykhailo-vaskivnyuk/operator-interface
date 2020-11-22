import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { styles } from './homeButton.styles';

function HomeButtonComponent({ classes }: WithStyles) {
  return (
    <div className={classes.wrapper}>
      <HomeIcon fontSize="large" />
    </div>
  );
}

export const HomeButton = withStyles(styles)(HomeButtonComponent);
