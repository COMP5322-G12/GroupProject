import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Typography } from 'material-ui';

const styles = () => ({
  root: {
    width: '100%',
    minHeight: 'calc(100% - 30px)',
  },
});

const ErrorScreen = ({ classes, code, message }) => (
  <div className={classes.root}>
    <Typography variant="headline">Error {code}</Typography>
    <Typography variant="body1">{message}</Typography>
  </div>
);

ErrorScreen.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  code: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(ErrorScreen);
