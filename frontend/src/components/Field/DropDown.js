import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Select } from 'material-ui';

import BaseField from './BaseField.js';

const styles = () => ({
});

const DropDown = ({
  label, value, error, warning, classes, options, ...rest
}) => (
  <BaseField
    label={label}
    disabled={rest.disabled}
    required={rest.required}
    error={error}
    warning={warning}
  >
    <Select
      native
      value={value}
      {...rest}
      inputProps={{ value, ...rest }}
    >
      {
        options.map(item => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))
      }
    </Select>
  </BaseField>
);

DropDown.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any, //eslint-disable-line
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

DropDown.defaultProps = {
  label: '',
  required: false,
  disabled: false,
  warning: false,
  error: false,
  options: [],
};

export default withStyles(styles)(DropDown);
