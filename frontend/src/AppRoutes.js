import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import ErrorScreen from 'containers/Screen/ErrorScreen';
import ProductScreen from 'containers/ProductScreen';
import ProductsScreen from 'containers/ProductsScreen';
import CartScreen from 'containers/CartScreen';
import LoginScreen from 'containers/LoginScreen';
import RegisterScreen from 'containers/RegisterScreen';
import ProfileScreen from 'containers/ProfileScreen';
import LogoutScreen from 'containers/LogoutScreen';
import EShopScreen from 'containers/EShopScreen';
import ReportScreen from 'containers/ReportScreen';
import HomeScreen from 'containers/HomeScreen';

const PrivateRoute = ({
  component: Component, authenticated, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (authenticated) {
        // TODO:: roles control
        return <Component {...props} />;
      }
      return (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />); //eslint-disable-line
    }}
  />
);

const AppRoutes = props => (
  <Switch>
    <Route exact path="/" render={screenProps => <HomeScreen {...screenProps} />} />
    <Route exact path="/products" render={screenProps => <ProductsScreen {...screenProps} />} />
    <Route exact path="/products/:code" render={screenProps => <ProductsScreen {...screenProps} />} />
    <Route exact path="/product/:id" render={screenProps => <ProductScreen {...screenProps} />} />
    <Route exact path="/cart" render={screenProps => <CartScreen {...screenProps} />} />
    <Route exact path="/register" render={screenProps => <RegisterScreen {...screenProps} />} />
    <Route exact path="/login" render={screenProps => <LoginScreen {...screenProps} />} />
    <PrivateRoute exact path="/my-profile" component={ProfileScreen} {...props} />
    <PrivateRoute exact path="/my-product" component={EShopScreen} {...props} />
    <PrivateRoute exact path="/reports" component={ReportScreen} {...props} />
    <PrivateRoute exact path="/logout" component={LogoutScreen} {...props} />
    <Route render={screenProps => (<ErrorScreen code={404} message="Coming Soon" {...screenProps} />)} />
  </Switch>
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.any.isRequired, // eslint-disable-line
};

AppRoutes.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default AppRoutes;
