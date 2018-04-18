import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { TableCell } from 'material-ui/Table';
import { Delete } from 'material-ui-icons';

import axios from 'helpers/Axios';
import Table from 'components/Table';
import Base64 from 'helpers/Base64';
import Loading from 'components/Loading';

import ProductForm from './ProductForm';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ProductList extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    me: PropTypes.shape({
      MemberID: PropTypes.number.isRequired,
    }).isRequired,
  };
  state = {
    isLoading: false,
    products: [],
    createItem: {
      ProductGroup: 'JEANS',
      ProductSubject: '',
      ProductContent: '',
      OnHandStock: 0,
      StandardPrice: 0,
      MembershipPrice: 0,
    },
  };
  async componentWillMount() {
    this.setState({ isLoading: true });
    const products = await this.getProducts();
    this.setState({ products, isLoading: false });
  }
  async getProducts() {
    const response = await axios.get(axios.getRootUrl(`Products?createdby=${this.props.me.MemberID}`), axios.mergeLoginConfig({}));
    return response.data;
  }
  validateProduct = (product) => {
    let haveError = false;
    if (!(product.OnHandStock && product.OnHandStock > 0)) {
      haveError = true;
    }
    return !haveError;
  }
  createProduct = async (product, close) => {
    // TODO::validate
    if (this.validateProduct(product)) {
      const response = await axios.post(axios.getRootUrl('Products'), {
        ProductGroup: product.ProductGroup,
        StartDate: '20180416',
        EndDate: '20180416',
        Subject: product.ProductSubject,
        Content: product.ProductContent,
        OnHandStock: product.OnHandStock,
        StandardPrice: product.StandardPrice,
        MembershipPrice: product.MembershipPrice,
        IPAddress: '127.0.0.1',
      }, axios.mergeLoginConfig({}));
      const { data: savedProduct } = response;
      if (product.image && product.ImageName) {
        const base64 = await Base64.encode(product.image.image);
        await axios.post(axios.getRootUrl('Products/UpdateImage'), {
          ProductID: savedProduct.ProductID,
          ImageName: product.image.ImageName,
          ImagePath: base64,
          IPAddress: '127.0.0.1',
        }, axios.mergeLoginConfig({}));
      }
      this.setState({ isLoading: true });
      const products = await this.getProducts();
      this.setState({ products, isLoading: false });
      if (close) {
        close();
      }
    }
  }
  updateProduct = async (product, close) => {
    // TODO::validate
    if (this.validateProduct(product)) {
      try {
        await axios.post(axios.getRootUrl('Products/Update'), {
          ProductID: product.ProductID,
          ProductGroup: product.ProductGroup,
          StartDate: '20180416',
          EndDate: '20180416',
          Subject: product.ProductSubject,
          Content: product.ProductContent,
          OnHandStock: product.OnHandStock,
          StandardPrice: product.StandardPrice,
          MembershipPrice: product.MembershipPrice,
          IPAddress: '127.0.0.1',
        }, axios.mergeLoginConfig({}));
      } catch (e) {
        console.log(e);
      }
      if (product.image && product.ImageName) {
        try {
          const base64 = await Base64.encode(product.image);
          await axios.post(axios.getRootUrl('Products/UpdateImage'), {
            ProductID: product.ProductID,
            ImageName: product.ImageName,
            ImagePath: base64,
            IPAddress: '127.0.0.1',
          }, axios.mergeLoginConfig({}));
        } catch (e) {
          console.log(e);
        }
      }
      this.setState({ isLoading: true });
      const products = await this.getProducts();
      this.setState({ products, isLoading: false });
      if (close) {
        close();
      }
    }
  }
  deleteProduct = async (product) => {
    await axios.delete(axios.getRootUrl(`Products?productId=${product.ProductID}`), axios.mergeLoginConfig({}));
    this.setState({ isLoading: true });
    const products = await this.getProducts();
    this.setState({ products, isLoading: false });
  }
  rendeActionRow = item => (
    <TableCell style={{ display: 'flex' }}>
      <ProductForm
        item={item}
        submitForm={(updateItem, close) => this.updateProduct(updateItem, close)}
      />
      <IconButton
        onClick={() => this.deleteProduct(item)}
      >
        <Delete />
      </IconButton>
    </TableCell>
  );
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <ProductForm
          isCreate
          item={this.state.createItem}
          submitForm={(item, close) => this.createProduct(item, close)}
        />
        {
          this.state.isLoading ?
            <Loading /> :
            <Table
              data={this.state.products}
              orderBy="ProductID"
              headers={[
                {
                  id: 'ProductID',
                  numeric: true,
                  disablePadding: false,
                  label: <Translate value="EShopScreen.ID" />,
                },
                {
                  id: 'ProductGroup',
                  numeric: false,
                  disablePadding: false,
                  label: <Translate value="EShopScreen.ProductGroup" />,
                },
                {
                  id: 'ProductSubject',
                  numeric: false,
                  disablePadding: false,
                  label: <Translate value="EShopScreen.ProductSubject" />,
                },
                {
                  id: 'StandardPrice',
                  numeric: true,
                  disablePadding: false,
                  label: <Translate value="EShopScreen.StandardPrice" />,
                },
                {
                  id: 'MembershipPrice',
                  numeric: true,
                  disablePadding: false,
                  label: <Translate value="EShopScreen.MembershipPrice" />,
                },
              ]}
              primaryKey="ProductID"
              renderActionRow={item => this.rendeActionRow(item)}
            />
        }
      </Paper>
    );
  }
}

export default withStyles(styles)(ProductList);
