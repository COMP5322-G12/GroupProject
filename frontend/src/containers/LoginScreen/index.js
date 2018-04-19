import { connect } from 'react-redux';

import AccountActions from 'redux/Account/actions';

import LoginScreen from './LoginScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = {
  ...AccountActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
