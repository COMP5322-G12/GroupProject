import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import ProductList from './ProductList';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

const EShopScreen = ({ classes, ...rest }) => (
  <div className={classes.root}>
    <ProductList {...rest} />
  </div>
);
EShopScreen.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EShopScreen);
