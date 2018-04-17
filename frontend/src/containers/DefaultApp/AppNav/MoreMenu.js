import React, { Component } from 'react';
import { Translate } from 'react-i18nify';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { MoreVert } from 'material-ui-icons';

import Grid from 'components/Grid';

class MoreMenu extends Component {
  state = {
    adminMenu: null,
  }
  render() {
    return (
      <Grid>
        <IconButton
          color="inherit"
          aria-owns={this.state.adminMenu ? 'admin-menu' : null}
          aria-haspopup="true"
          onClick={event => this.setState({ adminMenu: event.currentTarget })}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={this.state.adminMenu}
          open={Boolean(this.state.adminMenu)}
          onClose={() => this.setState({ adminMenu: null })}
        >
          <MenuItem component="a" href="/my-profile">
            <Translate value="AppNav.MyProfile" />
          </MenuItem>
          <MenuItem component="a" href="/my-product">
            <Translate value="AppNav.MyProduct" />
          </MenuItem>
          <MenuItem component="a" href="/reports">
            <Translate value="AppNav.MyReport" />
          </MenuItem>
        </Menu>
      </Grid>
    );
  }
}

export default MoreMenu;
