import { connect } from 'react-redux';

import FontSizeActions from 'redux/FontSize/actions';

import FontSizeSwitcher from 'components/Switcher/FontSizeSwitcher';

const mapStateToProps = ({ FontSize }) => FontSize;

const mapDispatchToProps = FontSizeActions;

export default connect(mapStateToProps, mapDispatchToProps)(FontSizeSwitcher);
