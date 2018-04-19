import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DefaultApp from 'containers/DefaultApp';
import Loading from 'components/Loading';

import AppRoutes from './AppRoutes';

class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    initAuth: PropTypes.func.isRequired,
    initFontSize: PropTypes.func.isRequired,
    initLanguage: PropTypes.func.isRequired,
    initCart: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };
  state = {
    loading: false,
  }
  async componentWillMount() {
    await this.loadingTask();
  }
  async loadingTask() {
    const {
      initAuth, initFontSize, initLanguage, initCart,
    } = this.props;
    try {
      this.setState({ loading: true });
      await initAuth();
      await initFontSize();
      await initLanguage();
      await initCart();
      this.setState({ loading: false });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <DefaultApp {...this.props}>
        {
          this.state.loading ?
            <Loading /> :
            <AppRoutes authenticated={this.props.authenticated} />
        }
      </DefaultApp>
    );
  }
}

export default App;
