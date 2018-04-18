import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { AddShoppingCart } from 'material-ui-icons';
import Card, { CardHeader, CardContent, CardMedia, CardActions } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';

import Loading from 'components/Loading';
import axios from 'helpers/Axios';
import ErrorScreen from 'containers/Screen/ErrorScreen';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    width: '98%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 300,
  },
});

class ProductScreen extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    authericated: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    addCart: PropTypes.func.isRequired,
  };
  state = {
    loading: false,
    product: null,
  };
  async componentWillMount() {
    this.setState({ loading: true });
    const product = await this.getProduct();
    this.setState({ loading: false, product });
  }
  async getProduct() {
    const { match: { params: { id } } } = this.props;
    const response = await axios.get(axios.getRootUrl(`Products?ProductID=${id}`), {});
    return response.data ? response.data[0] : null;
  }
  renderProductDetail() {
    const { classes } = this.props;
    const { product } = this.state;
    if (product) {
      return (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={product.ImagePath ? product.ImagePath : 'pic/noimage.png'}
            src="image"
          />
          <div>
            <CardHeader title={product.ProductContent} />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary={<Translate value="ProductScreen.ProductGroup" />}
                    secondary={product.ProductGroup}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Translate value="ProductScreen.DisplayContent" />}
                    secondary={product.DisplayContent}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Translate value="ProductScreen.Price" />}
                    secondary={`$ ${
                      this.props.authericated ?
                      product.MembershipPrice :
                      product.StandardPrice
                    }`}
                  />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button onClick={() => this.props.addCart(product.ProductID)}>
                <AddShoppingCart /><Translate value="ProductScreen.AddToCart" />
              </Button>
            </CardActions>
          </div>
        </Card>
      );
    }
    return (
      <ErrorScreen code={404} message={<Translate value="ProductScreen.PrductNotFound" />} />
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        { this.state.loading ? <Loading /> : this.renderProductDetail() }
      </div>
    );
  }
}

export default withStyles(styles)(ProductScreen);
