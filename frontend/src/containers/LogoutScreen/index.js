import { connect } from 'react-redux';

import AccountActions from 'redux/Account/actions';

import LogoutScreen from './LogoutScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = {
  ...AccountActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
