import { connect } from 'react-redux';

import ReportScreen from './ReportScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
