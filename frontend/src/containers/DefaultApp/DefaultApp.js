import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import LoadingDialog from 'components/LoadingDialog';

import AppNav from './AppNav';
import AppFooter from './AppFooter';

const styles = theme => ({
  appFrame: {
    // display: 'flex',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    height: 'calc(100% - 148px)',
    padding: 0,
    marginTop: 128,
    paddingTop: 20,
    flexGrow: 1,
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.default,
    overflowY: 'scroll',
  },
});

class DefaultApp extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    children: PropTypes.element.isRequired,
    toast: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    stopLoading: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
  };
  state = {
    whichPanel: false,
  };
  componentWillMount() {
    if (this.props.toast) {
      toast(this.props.message);
      this.props.reset();
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.toast) {
      toast(newProps.message);
      this.props.reset();
    }
  }
  togglePanel() {
    this.setState({ whichPanel: !this.state.whichPanel });
  }
  render() {
    const {
      classes, children, authenticated, loading, stopLoading,
    } = this.props;
    return (
      <div className={classes.appFrame}>
        <AppNav
          authenticated={authenticated}
          onPanelChange={() => this.togglePanel()}
        />
        <AppBar
          style={{
            minHeight: 64,
            backgroundColor: '#555555',
            top: 64,
            zIndex: -100,
          }}
        />
        <main className={classes.content}>
          <div style={{ minHeight: 'calc(100% - 55px)', marginBottom: 30 }}>
            {children}
          </div>
          <AppFooter />
        </main>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          pauseOnHover
          closeOnClick
        />
        <LoadingDialog loading={loading} handleClose={() => stopLoading()} />
      </div>
    );
  }
}

export default withStyles(styles)(DefaultApp);
