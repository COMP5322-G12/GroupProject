import { connect } from 'react-redux';

import AccountActions from 'redux/Account/actions';

import MemberCard from 'components/MemberCard';

const mapStateToProps = ({ Account }) => Account;
const mapDispatchToProps = AccountActions;

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard);
