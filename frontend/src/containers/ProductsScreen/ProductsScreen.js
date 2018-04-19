import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import { AddShoppingCart, Warning, Info } from 'material-ui-icons';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import Loading from 'components/Loading';
import Grid from 'components/Grid';
import axios from 'helpers/Axios';
import AppConfig from 'constants/AppConfig';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  appBar: {
    position: 'initial',
    backgroundColor: '#464c5d',
  },
});

class ProductsScreen extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    authericated: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        code: PropTypes.string,
      }),
    }).isRequired,
    addCart: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
  };
  static defaultProps = {
    authericated: false,
  }
  state = {
    productMenu: AppConfig.productCategory,
    loading: false,
    products: [],
  };
  async componentWillMount() {
    this.setState({ loading: true });
    const products = await this.getProducts();
    this.setState({ products, loading: false });
  }
  async getProducts() {
    const url = this.props.match.params.code ? `Products?category=${this.props.match.params.code}` : 'Products';
    const response = await axios.get(axios.getRootUrl(url), {});
    return response.data;
  }
  renderProductList() {
    const { classes, width } = this.props;
    let cols = 1;
    if (width === 'sm' || width === 'md') {
      cols = 3;
    } else if (width === 'lg' || width === 'xl') {
      cols = 5;
    }
    const filterProduct = this.state.products;
    if (filterProduct.length > 0) {
      return (
        <Grid style={{ alignItems: 'flex-start' }}>
          <GridList cellHeight={400} cols={cols} spacing={8} className={classes.gridList}>
            {
              filterProduct.map(product => (
                <GridListTile key={product.ProductID}>
                  <img
                    src={product.ImagePath ? product.ImagePath : 'pic/noimage.png'}
                    alt={product.ProductSubject}
                  />
                  <GridListTileBar
                    title={product.ProductSubject}
                    subtitle={
                      <Translate
                        value="ProductsScreen.ProductSubTitle"
                        price={
                          this.props.authericated ?
                          product.MembershipPrice : product.StandardPrice
                        }
                      />
                    }
                    actionIcon={
                      <div>
                        <IconButton component="a" href={`/product/${product.ProductID}`}>
                          <Info />
                        </IconButton>
                        <IconButton onClick={() => this.props.addCart(product.ProductID)} >
                          <AddShoppingCart />
                        </IconButton>
                      </div>
                    }
                  />
                </GridListTile>
              ))
            }
          </GridList>
        </Grid>
      );
    }
    return (
      <div>
        <Typography variant="title" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size={50} ><Warning /></Avatar>
          <Translate tag="span" value="ProductsScreen.NoProductTitle" />
        </Typography>
        <p><Translate value="ProductsScreen.NoProduct" /></p>
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} style={{ backgroundColor: '#111111' }}>
          <Toolbar
            style={{
              minHeight: 40,
              backgroundColor: '#111111',
              color: '#c0bfbf',
              margin: '0 auto',
              width: '90%',

            }}
            disableGutters
          >
            {
              this.state.productMenu.map(item =>
                (
                  <Button
                    component="a"
                    key={item.id}
                    href={`/products/${item.code}`}
                    style={{
                      color: '#c0bfbf',
                      fontFamily: 'abelregular',
                      fontSize: 15,
                      letterSpacing: 2,
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      maxHeight: 48,
                    }}
                  >
                    <Translate value={`AppNav.${item.code}`} />
                  </Button>
                ))
            }
          </Toolbar>
        </AppBar>
        { this.state.loading ? <Loading /> : this.renderProductList() }
      </div>
    );
  }
}

export default compose(withStyles(styles), withWidth())(ProductsScreen);
