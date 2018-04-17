import { connect } from 'react-redux';

import ShoppingCartActions from 'redux/ShoppingCart/actions';

import ProductScreen from './ProductScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = { ...ShoppingCartActions };

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
