import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { withStyles } from 'material-ui';

const styles = () => ({
  grid: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Grid = ({
  children, classes, className, ...rest
}) => (
  <div className={cx(classes.grid, className)} {...rest}>
    {children}
  </div>
);

Grid.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Grid.defaultProps = {
  children: null,
  className: '',
};

export default withStyles(styles)(Grid);
