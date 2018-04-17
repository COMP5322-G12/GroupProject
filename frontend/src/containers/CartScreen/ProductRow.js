import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import { Add, Remove, RemoveShoppingCart } from 'material-ui-icons';

import Grid from 'components/Grid';

const ProductRow = ({
  item, addCart, subCart, removeCart, authenticated,
}) => (
  <tr>
    <td style={{ width: '15%' }}>
      <img
        src={item.ImagePath}
        alt={item.ProductSubject}
        style={{ maxWidth: 150 }}
      />
    </td>
    <td style={{ width: '50%' }}>{item.ProductSubject}</td>
    <td style={{ textAlign: 'center' }}>
      ${(authenticated ? item.MembershipPrice : item.StandardPrice)}
    </td>
    <td>
      <Grid>
        <span style={{ flex: 0.7, textAlign: 'center' }}>{item.total}</span>
        <IconButton style={{ flex: 0.15 }} disabled={false} onClick={() => addCart(item.productID)}>
          <Add />
        </IconButton>
        <IconButton
          style={{ flex: 0.15 }}
          disabled={item.total <= 0}
          onClick={() => subCart(item.productID)}
        >
          <Remove />
        </IconButton>
      </Grid>
    </td>
    <td style={{ textAlign: 'right' }}>
      ${(authenticated ? item.MembershipPrice : item.StandardPrice) * item.total}
    </td>
    <td>
      <IconButton onClick={() => removeCart(item.productID)}>
        <RemoveShoppingCart />
      </IconButton>
    </td>
  </tr>
);

ProductRow.propTypes = {
  item: PropTypes.shape({}).isRequired,
  addCart: PropTypes.func.isRequired,
  subCart: PropTypes.func.isRequired,
  removeCart: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default ProductRow;
