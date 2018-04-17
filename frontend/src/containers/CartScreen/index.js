import { connect } from 'react-redux';

import ShoppingCartActions from 'redux/ShoppingCart/actions';

import CartScreen from './CartScreen';

const mapStateToProps = ({ Account, ShoppingCart }) => ({ ...Account, ...ShoppingCart });
const mapDispatchToProps = { ...ShoppingCartActions };

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
