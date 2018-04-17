import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoadingActions from 'redux/Loading/actions';
import AccountActions from 'redux/Account/actions';
import FontSizeActions from 'redux/FontSize/actions';
import LanguageActions from 'redux/Language/actions';
import ShoppingCartActions from 'redux/ShoppingCart/actions';

import App from './App';

const mapStateToProps = ({
  Account, Toast, Loading,
}) => ({
  ...Account, ...Toast, ...Loading,
});
const mapDispatchToProps = {
  ...LoadingActions,
  ...AccountActions,
  ...FontSizeActions,
  ...LanguageActions,
  ...ShoppingCartActions,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(ConnectedApp);
