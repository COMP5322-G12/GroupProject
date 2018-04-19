import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-i18nify';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { ModeEdit, Add } from 'material-ui-icons';

import { TextField, DropDown } from 'components/Field';

class ProductList extends Component {
  static propTypes = {
    item: PropTypes.shape({}).isRequired,
    isCreate: PropTypes.bool,
    submitForm: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isCreate: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      item: {
        ...props.item,
        image: '',
        ImageName: '',
      },
      error: {
        ProductGroup: [],
        ProductSubject: [],
        ProductContent: [],
        OnHandStock: [],
        StandardPrice: [],
        MembershipPrice: [],
      },
      open: false,
    };
  }
  validateProduct = (product) => {
    let haveError = false;
    const error = {
      ProductGroup: [],
      ProductSubject: [],
      ProductContent: [],
      OnHandStock: [],
      StandardPrice: [],
      MembershipPrice: [],
    };
    if (product.ProductGroup === '') {
      haveError = true;
      error.ProductGroup.push('Product Group is required');
    }
    if (product.ProductSubject === '') {
      haveError = true;
      error.ProductSubject.push('Subject is required');
    }
    if (product.ProductContent === '') {
      haveError = true;
      error.ProductContent.push('Content is required');
    }
    if (!(product.OnHandStock && product.OnHandStock > 0)) {
      haveError = true;
      error.OnHandStock.push('On Hand Stock is required and should large than 0');
    }
    if (!(product.StandardPrice && product.StandardPrice > 0)) {
      haveError = true;
      error.StandardPrice.push('Standard Price is required and should large than 0');
    }
    if (!(product.MembershipPrice && product.MembershipPrice > 0)) {
      haveError = true;
      error.MembershipPrice.push('Membership Price is required and should large than 0');
    }
    this.setState({ error: { ...this.state.error, ...error } });
    return !haveError;
  }
  render() {
    const { item, error } = this.state;
    return (
      <div>
        {
          this.props.isCreate ?
            <Button onClick={() => this.setState({ open: true })}>
              <Add />
              <Translate value={`EShopScreen.${this.props.isCreate ? 'Create' : 'Update'}`} />
            </Button> :
            <IconButton onClick={() => this.setState({ open: true })}>
              <ModeEdit />
            </IconButton>
        }
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <DialogTitle>
            <Translate value={`EShopScreen.${this.props.isCreate ? 'Create' : 'Update'}`} />
            &nbsp;
            <Translate value="EShopScreen.Product" />
          </DialogTitle>
          <DialogContent>
            {
              item.ImagePath ?
                <img
                  src={`${item.ImagePath}`}
                  alt={item.Subject}
                  style={{ height: 200 }}
                />
                : null
            }
            <DropDown
              label={(<Translate value="EShopScreen.ProductGroup" />)}
              name="gender"
              value={item.ProductGroup}
              options={[
                { label: I18n.t('AppNav.SKIRT'), value: 'SKIRT' },
                { label: I18n.t('AppNav.JEANS'), value: 'JEANS' },
                { label: I18n.t('AppNav.JACKETS'), value: 'JACKETS' },
                { label: I18n.t('AppNav.ACCESSORIES'), value: 'ACCESSORIES' },
              ]}
              onChange={e => this.setState({ item: { ...item, ProductGroup: e.target.value } })}
              required
              disabled={this.state.isSubmit}
              error={error.ProductGroup.length > 0}
              helperText={error.ProductGroup}
            />
            <TextField
              label={(<Translate value="EShopScreen.ProductSubject" />)}
              name="ProductSubject"
              value={item.ProductSubject}
              onChange={e => this.setState({ item: { ...item, ProductSubject: e.target.value } })}
              required
              disabled={this.state.isSubmit}
              error={error.ProductSubject.length > 0}
              helperText={error.ProductSubject}
            />
            <TextField
              label={(<Translate value="EShopScreen.ProductContent" />)}
              name="Content"
              value={item.ProductContent}
              onChange={e => this.setState({ item: { ...item, ProductContent: e.target.value } })}
              required
              disabled={this.state.isSubmit}
              error={error.ProductContent.length > 0}
              helperText={error.ProductContent}
            />
            <TextField
              type="number"
              label={(<Translate value="EShopScreen.OnHandStock" />)}
              name="OnHandStock"
              value={item.OnHandStock}
              onChange={e => this.setState({ item: { ...item, OnHandStock: e.target.value } })}
              required
              disabled={this.state.isSubmit}
              error={error.OnHandStock.length > 0}
              helperText={error.OnHandStock}
            />
            <TextField
              type="number"
              label={(<Translate value="EShopScreen.StandardPrice" />)}
              name="StandardPrice"
              value={item.StandardPrice}
              onChange={e => this.setState({ item: { ...item, StandardPrice: e.target.value } })}
              required
              disabled={this.state.isSubmit}
              error={error.StandardPrice.length > 0}
              helperText={error.StandardPrice}
            />
            <TextField
              type="number"
              label={(<Translate value="EShopScreen.MembershipPrice" />)}
              name="MembershipPrice"
              value={item.MembershipPrice}
              onChange={e => this.setState({ item: { ...item, MembershipPrice: e.target.value } })}
              required
              disabled={this.state.isSubmit}
              error={error.MembershipPrice.length > 0}
              helperText={error.MembershipPrice}
            />
            <TextField
              label={(<Translate value="ProfileScreen.profileImageSrc" />)}
              name="image"
              value={item.image ? item.ImageName : ''}
              type="file"
              disabled={this.state.isSubmit}
              onChange={(e) => {
                const file = e.target.files[0];
                this.setState({ item: { ...item, image: file, ImageName: e.target.value } });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={this.state.isSubmit}
              onClick={() => {
                if (this.validateProduct(this.state.item)) {
                  this.setState({ isSubmit: true });
                  this.props.submitForm(this.state.item, () => {
                    this.setState({ open: false, isSubmit: false });
                  });
                }
              }}
            >
              <Translate value={`EShopScreen.${this.props.isCreate ? 'Create' : 'Update'}`} />
            </Button>
            <Button
              disabled={this.state.isSubmit}
              onClick={() => {
                this.setState({ open: false });
              }}
            >
              <Translate value="EShopScreen.Close" />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ProductList;
