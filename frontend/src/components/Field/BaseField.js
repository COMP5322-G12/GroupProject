import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';

import BaseLabel from './BaseLabel';
import BaseHelptext from './BaseHelptext';

const styles = () => ({
});

class BaseField extends Component {
  static propTypes = {
    // classes: PropTypes.shape({}).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    children: PropTypes.element,
    helperText: PropTypes.any, //eslint-disable-line
  };
  static defaultProps = {
    label: '',
    required: false,
    children: null,
    disabled: false,
    warning: false,
    error: false,
    helperText: [],
  };
  renderLabel() {
    const {
      label, required, error, warning, disabled,
    } = this.props;
    return (
      <BaseLabel
        label={label}
        shrink
        disabled={disabled}
        required={required}
        error={error || warning}
      />
    );
  }
  renderError() {
    return (<BaseHelptext error message={this.props.helperText} disabled={this.props.disabled} />);
  }
  renderWarning() {
    return (<BaseHelptext message={this.props.helperText} disabled={this.props.disabled} />);
  }
  render() {
    const {
      label, children, error, warning,
    } = this.props;
    return (
      <FormControl fullWidth error={error || warning}>
        {label ? this.renderLabel() : null}
        {children}
        {warning ? this.renderWarning() : null}
        {error ? this.renderError() : null}
      </FormControl>
    );
  }
}

export default withStyles(styles)(BaseField);
