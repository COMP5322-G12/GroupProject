import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import { Done } from 'material-ui-icons';

import AppConfig from 'constants/AppConfig';
import axios from 'helpers/Axios';
import Loading from 'components/Loading';
import { TextField } from 'components/Field';

import ProductRow from './ProductRow';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    minWidth: 500,
    width: '99%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 50,
  },
  table: {
    width: '100%',
  },
});

class CartScreen extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    me: PropTypes.shape({}).isRequired,
    cart: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    addCart: PropTypes.func.isRequired,
    subCart: PropTypes.func.isRequired,
    removeCart: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
  };
  state = {
    loading: false,
    successOpen: false,
    cartProduct: [],
    total: 0,
    orderPerson: {
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Building: '',
      Street: '',
      City: '',
      State: '',
      Zip: '',
      ContactPhone: '',
      EMail: '',
    },
  };
  async componentWillMount() {
    this.init();
  }
  async componentWillReceiveProps() {
    await this.init();
  }
  onSuccess = async (payment) => {
    const { cartProduct, total, orderPerson } = this.state;
    try {
      await axios.post(axios.getRootUrl('Sales'), {
        CartProduct: cartProduct.map(item => ({
          ProductID: item.ProductID,
          Total: item.total,
          StandardPrice: item.StandardPrice,
          MembershipPrice: item.MembershipPrice,
        })),
        Total: total,
        OrderPerson: orderPerson,
        Payment: payment,
        IpAddress: '127.0.0.1',
      }, {});
      this.setState({ successOpen: true });
    } catch (e) {
      this.setState({ successOpen: true });
    }
  }
  onCancel = () => {
    alert('The payment was cancelled!'); // eslint-disable-line
  }
  onError = () => {
    alert('Error!'); // eslint-disable-line
  }
  getProduct = item => new Promise(async (resolve) => {
    const response = await axios.get(axios.getRootUrl(`Products?ProductID=${item.productID}`), {});
    if (response.data) {
      const product = response.data[0];
      const price = (this.props.authenticated ? product.MembershipPrice : product.StandardPrice)
        * item.total;
      resolve({ ...item, ...product, price });
    } else {
      resolve({ ...item, price: 0 });
    }
  });
  async init() {
    this.setState({ loading: true });
    const { cart } = this.props;
    const product = await Promise.all(cart.map(item => this.getProduct(item)));
    this.setState({
      cartProduct: product,
      total: product.reduce((a, b) => {
        const price = this.props.authenticated ? b.MembershipPrice : b.StandardPrice;
        return a + (price * b.total);
      }, 0),
    });
    const { me } = this.props;
    if (this.props.authenticated) {
      this.setState({
        orderPerson: {
          ...this.state.orderPerson,
          EMail: me.EMail ? me.EMail : '',
          FirstName: me.FirstName ? me.FirstName : '',
          MiddleName: me.MiddleName ? me.MiddleName : '',
          LastName: me.LastName ? me.LastName : '',
          Building: me.Building ? me.Building : '',
          Street: me.Street ? me.Street : '',
          City: me.City ? me.City : '',
          State: me.State ? me.State : '',
          ContactPhone: me.ContactPhone ? me.ContactPhone : '',
        },
      });
    }
    this.setState({ loading: false });
  }
  handleClose = () => {
    this.props.reset();
    this.setState({ successOpen: false });
    window.location.href = '/'; //eslint-disable-line
  }
  testHaveValue = value => value && value !== ''
  canClick = () => {
    const {
      cartProduct, total,
      orderPerson: {
        FirstName, LastName,
        Building, Street, City, State,
        ContactPhone, EMail,
      },
    } = this.state;
    return (
      cartProduct.length > 0 && total > 0 &&
      this.testHaveValue(FirstName) && this.testHaveValue(LastName) &&
      this.testHaveValue(Building) && this.testHaveValue(Street) &&
      this.testHaveValue(City) && this.testHaveValue(State) &&
      this.testHaveValue(ContactPhone) && this.testHaveValue(EMail)
    );
  }
  renderRows() {
    if (this.state.cartProduct.length > 0) {
      return this.state.cartProduct.map(item => (
        <ProductRow
          key={item.productID}
          item={item}
          {...this.props}
        />
      ));
    }
    return (
      <tr>
        <td colSpan="5" style={{ textAlign: 'center', color: '#f00' }}>
          <Translate value="CartScreen.NoProduct" />
        </td>
      </tr>
    );
  }
  render() {
    const { classes } = this.props;
    const { orderPerson } = this.state;
    return (
      <div className={classes.root}>
        <Typography component={Translate} variant="title" gutterBottom align="center" value="CartScreen.title" />
        <Card className={classes.card}>
          <CardHeader title={<Translate value="CartScreen.ProductTableTitle" />} />
          <CardContent>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th colSpan="2" style={{ width: '65%' }}><Translate value="CartScreen.Product" /></th>
                  <th style={{ width: '10%' }}><Translate value="CartScreen.Price" /></th>
                  <th style={{ width: '10%' }}><Translate value="CartScreen.Quantity" /></th>
                  <th style={{ width: '10%' }}><Translate value="CartScreen.TotalPrice" /></th>
                  <th style={{ width: '5%' }} />
                </tr>
              </thead>
              <tbody>
                {
                  this.state.loading ?
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#f00' }}>
                        <Loading />
                      </td>
                    </tr> :
                    this.renderRows()
                }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right' }}>
                    <Translate value="CartScreen.TotalPrice" />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    ${this.state.total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader title={<Translate value="CartScreen.OrderPersonCardTitle" />} />
          <CardContent>
            <TextField
              label={(<Translate value="ProfileScreen.firstName" />)}
              name="FirstName"
              value={orderPerson.FirstName}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, FirstName: e.target.value },
              })}
              error={orderPerson.FirstName === ''}
              helperText={orderPerson.FirstName === '' ? 'Enter First Name' : ''}
            />
            <TextField
              label={(<Translate value="ProfileScreen.middleName" />)}
              name="MiddleName"
              value={orderPerson.MiddleName}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, MiddleName: e.target.value },
              })}
            />
            <TextField
              label={(<Translate value="ProfileScreen.lastName" />)}
              name="LastName"
              value={orderPerson.LastName}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, LastName: e.target.value },
              })}
              error={orderPerson.LastName === ''}
              helperText={orderPerson.LastName === '' ? 'Enter Last Name' : ''}
            />
            <TextField
              label={(<Translate value="ProfileScreen.building" />)}
              name="Building"
              value={orderPerson.Building}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, Building: e.target.value },
              })}
              error={orderPerson.Building === ''}
              helperText={orderPerson.Building === '' ? 'Enter Building' : ''}
            />
            <TextField
              label={(<Translate value="ProfileScreen.street" />)}
              name="Street"
              value={orderPerson.Street}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, Street: e.target.value },
              })}
              error={orderPerson.Street === ''}
              helperText={orderPerson.Street === '' ? 'Enter Street' : ''}
            />
            <TextField
              label={(<Translate value="ProfileScreen.city" />)}
              name="City"
              value={orderPerson.City}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, City: e.target.value },
              })}
              error={orderPerson.City === ''}
              helperText={orderPerson.City === '' ? 'Enter City' : ''}
            />
            <TextField
              label={(<Translate value="ProfileScreen.state" />)}
              name="State"
              value={orderPerson.State}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, State: e.target.value },
              })}
              error={orderPerson.State === ''}
              helperText={orderPerson.State === '' ? 'Enter State' : ''}
            />
            <TextField
              label={(<Translate value="ProfileScreen.phone" />)}
              name="ContactPhone"
              value={orderPerson.ContactPhone}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, ContactPhone: e.target.value },
              })}
              error={orderPerson.ContactPhone === ''}
              helperText={orderPerson.ContactPhone === '' ? 'Enter Contact Phone' : ''}
            />
            <TextField
              label={(<Translate value="ProfileScreen.email" />)}
              name="EMail"
              value={orderPerson.EMail}
              onChange={e => this.setState({
                orderPerson: { ...orderPerson, EMail: e.target.value },
              })}
              error={orderPerson.EMail === ''}
              helperText={orderPerson.EMail === '' ? 'Enter EMail' : ''}
            />
          </CardContent>
        </Card>
        <ButtonBase
          component="div"
          style={{ width: '100%', justifyContent: 'center', zIndex: 100 }}
          disabled={!this.canClick()}
        >
          <PaypalExpressBtn
            style={{ zIndex: 50 }}
            env="sandbox"
            client={AppConfig.paypal}
            currency="HKD"
            total={this.state.total}
            onSuccess={this.onSuccess}
            onCancel={this.onCancel}
            onError={this.onError}
            shipping={1}
          />
        </ButtonBase>
        <Dialog open={this.state.successOpen} disableBackdropClick disableEscapeKeyDown>
          <DialogContent style={{ textAlign: 'center' }}>
            <Done style={{ width: 250, height: 250, color: 'green' }} />
            <p><Translate value="CartScreen.SuccessMessage" /></p>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button onClick={() => this.handleClose()}>
              <Translate value="CartScreen.Close" />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CartScreen);
