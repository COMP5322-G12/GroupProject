import { connect } from 'react-redux';

import AccountActions from 'redux/Account/actions';

import RegisterScreen from './RegisterScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = {
  ...AccountActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
