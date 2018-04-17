import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Checkbox, FormControlLabel } from 'material-ui';
import BaseField from './BaseField.js';

const styles = () => ({
});

const MyCheckbox = ({
  label, value, error, warning, classes, ...rest
}) => (
  <BaseField
    disabled={rest.disabled}
    required={rest.required}
    error={error}
    warning={warning}
  >
    <FormControlLabel
      control={<Checkbox checked={value} {...rest} />}
      label={label}
    />
  </BaseField>
);

MyCheckbox.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any, //eslint-disable-line
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

MyCheckbox.defaultProps = {
  label: '',
  required: false,
  disabled: false,
  warning: false,
  error: false,
};

export default withStyles(styles)(MyCheckbox);
