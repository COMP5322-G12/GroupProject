import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import { withStyles } from 'material-ui';
import List, { ListItem, ListItemText } from 'material-ui/List';

import AppConfig from 'constants/AppConfig';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});

const ReportScreen = ({ me, classes }) => (
  <div className={classes.root}>
    <p>All Reports</p>
    <List className={classes.list}>
      {
        [
          {
            id: 1,
            url: `${AppConfig.reportHost}InventoryReport.aspx?EMail=${me.MemberID}`,
            name: (<Translate value="ReportScreen.InventoryBalanceByLocationReport" />),
          },
          {
            id: 2,
            url: `${AppConfig.reportHost}OrderSummaryReport.aspx?EMail=${me.MemberID}`,
            name: (<Translate value="ReportScreen.SalesSummaryByLocationReport" />),
          },
          {
            id: 3,
            url: `${AppConfig.reportHost}ForecastingReport.aspx?EMail=${me.MemberID}`,
            name: (<Translate value="ReportScreen.ForecastingReport" />),
          },
        ].map(item => (
          <ListItem key={item.id} button component="a" onClick={() => window.open(item.url, '', 'width=900,height=900')}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))
      }
    </List>
  </div>
);

ReportScreen.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ReportScreen);
