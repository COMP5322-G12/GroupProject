import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { ShoppingCart } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

import Spacer from 'components/Spacer';

import LanguageSwitcher from './LanguageSwitcherContainer';
import FontSizeSwitcher from './FontSizeSwitcherContainer';
import MemberMenu from './MemberMenu';
import MoreMenu from './MoreMenu';

const styles = theme => ({
  appBar: {
    [theme.breakpoints.down('xs')]: {
      overflowX: 'scroll',
      overflowY: 'visible',
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      height: 30,
    },
  },
});

const AppNav = ({ classes }) => (
  <AppBar color="primary" className={classes.appBar}>
    <Toolbar disableGutters>
      <img src="/pic/logo.png" alt="Logo" className={classes.image} />
      <Button color="inherit" component="a" href="/">
        <Translate value="AppNav.Home" />
      </Button>
      <Button color="inherit" component="a" href="/products">
        <Translate value="AppNav.Collections" />
      </Button>
      <Spacer />
      <IconButton component="a" href="/cart" color="inherit">
        <ShoppingCart />
      </IconButton>
      <MemberMenu />
      <LanguageSwitcher />
      <FontSizeSwitcher />
      <MoreMenu />
    </Toolbar>
  </AppBar>
);

AppNav.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AppNav);
