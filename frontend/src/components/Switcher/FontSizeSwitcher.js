import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18nify';

import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { FontDownload } from 'material-ui-icons';

import Grid from 'components/Grid';

import AppConfig from 'constants/AppConfig';

class FontSizeSwitcher extends Component {
  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    changeFontSize: PropTypes.func.isRequired,
  };
  state = {
    fontsizeMenu: null,
  }
  render() {
    return (
      <Grid>
        <IconButton
          color="inherit"
          aria-owns={this.state.fontsizeMenu ? 'fontsize-menu' : null}
          aria-haspopup="true"
          onClick={event => this.setState({ fontsizeMenu: event.currentTarget })}
          title={I18n.t('FontSizeSwitcher.title')}
        >
          <FontDownload />
        </IconButton>
        <Menu
          anchorEl={this.state.fontsizeMenu}
          open={Boolean(this.state.fontsizeMenu)}
          onClose={() => this.setState({ fontsizeMenu: null })}
        >
          {
            AppConfig.fontSize.map(item => (
              <MenuItem
                button
                key={item}
                style={{ fontSize: `${item / 100}em` }}
                disabled={item === this.props.fontSize}
                onClick={() => this.props.changeFontSize(item)}
                title={`${item}%`}
              >
                A
              </MenuItem>
            ))
          }
        </Menu>
      </Grid>
    );
  }
}

export default FontSizeSwitcher;
