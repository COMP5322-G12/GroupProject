import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';

const styles = () => ({
  label: {
  },
});

const BaseLabel = ({
  label, classes, ...rest
}) => (
  <InputLabel className={classes.label} {...rest}>
    { label }
  </InputLabel>
);

BaseLabel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  shrink: PropTypes.bool,
};

BaseLabel.defaultProps = {
  label: '',
  required: false,
  error: false,
  disabled: false,
  shrink: false,
};

export default withStyles(styles)(BaseLabel);
