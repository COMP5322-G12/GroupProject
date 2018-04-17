import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText } from 'material-ui/Form';

const BaseHelptext = ({ message, ...rest }) => (
  <FormHelperText {...rest}>
    {
      Array.isArray(message) ?
        message.map((item, i) => (<span key={i}>{item}</span>)) :
        message
    }
  </FormHelperText>
);

BaseHelptext.propTypes = {
  message: PropTypes.any, //eslint-disable-line
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

BaseHelptext.defaultProps = {
  message: [],
  error: false,
  disabled: false,
};

export default BaseHelptext;
