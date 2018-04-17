import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

const Spacer = ({ classes }) => (<div className={classes.root} />);

Spacer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Spacer);
