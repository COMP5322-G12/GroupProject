import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import BaseField from './BaseField.js';

const styles = () => ({
});

const TextField = ({
  label, type, error, warning, value, helperText, ...rest
}) => (
  <BaseField
    label={label}
    disabled={rest.disabled}
    required={rest.required}
    error={error}
    warning={warning}
    helperText={helperText}
  >
    <Input fullWidth type={type} value={value} {...rest} />
  </BaseField>
);


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any, //eslint-disable-line
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  helperText: PropTypes.any, //eslint-disable-line
};

TextField.defaultProps = {
  label: '',
  type: 'text',
  value: '',
  required: false,
  disabled: false,
  warning: false,
  error: false,
  helperText: [],
};

export default withStyles(styles)(TextField);
