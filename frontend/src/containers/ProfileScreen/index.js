import { connect } from 'react-redux';

import AccountActions from 'redux/Account/actions';

import ProfileScreen from './ProfileScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = {
  ...AccountActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
