import { connect } from 'react-redux';

import ShoppingCartActions from 'redux/ShoppingCart/actions';

import ProductsScreen from './ProductsScreen';

const mapStateToProps = ({ Account }) => ({ ...Account });
const mapDispatchToProps = { ...ShoppingCartActions };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
