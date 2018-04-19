import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Spacer from 'components/Spacer';

const styles = () => ({
  root: {
    width: '100%',
    backgroundColor: '#111111',
    color: '#ffffff',
    display: 'flex',
  },
});

const AppFooter = ({ classes }) => {
  const year = (new Date()).getFullYear();
  return (
    <footer className={classes.root}>
      <Typography component="span" variant="body1" gutterBottom align="left" style={{ color: '#fff' }}>
        <Translate value="AppFooter.footer" end={year <= 2018 ? '' : `- ${year}`} />
      </Typography>
      <Spacer />
      <Typography
        component="span"
        variant="body1"
        gutterBottom
        align="right"
        style={{ color: '#fff' }}
      >
        <img
          src="/pic/fb.png"
          alt="Find us in Facebook"
          style={{ backgroundColor: '#fff', height: 10 }}
        />
      </Typography>
    </footer>
  );
};

AppFooter.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AppFooter);
