import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

class LogoutScreen extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    logout: PropTypes.shape({}).isRequired,
  };
  componentWillMount() {
    this.props.logout();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CircularProgress /> <Translate value="LogoutScreen.loading" />...
      </div>
    );
  }
}

export default withStyles(styles)(LogoutScreen);
