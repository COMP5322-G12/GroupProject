import { connect } from 'react-redux';

import EShopScreen from './EShopScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(EShopScreen);
