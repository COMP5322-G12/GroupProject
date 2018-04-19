import { connect } from 'react-redux';

import ToastActions from 'redux/Toast/actions';

import DefaultApp from './DefaultApp';

const mapStateToProps = ({ Account }) => Account;
const mapDispatchToProps = { ...ToastActions };

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);
