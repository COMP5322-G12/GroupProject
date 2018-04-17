import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-i18nify';

import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { Language } from 'material-ui-icons';

import AppConfig from 'constants/AppConfig';
import Grid from 'components/Grid';

const supportLanguage = {
  en: { label: 'Application.language.en', langLabel: 'English', value: 'en' },
  hk: { label: 'Application.language.hk', langLabel: '繁體中文', value: 'hk' },
  cn: { label: 'Application.language.cn', langLabel: '简体中文', value: 'cn' },
};

class LanguageSwitcher extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired,
  };
  state = {
    languageMenu: null,
  }
  render() {
    return (
      <Grid>
        <IconButton
          color="inherit"
          aria-owns={this.state.languageMenu ? 'language-menu' : null}
          aria-haspopup="true"
          onClick={event => this.setState({ languageMenu: event.currentTarget })}
          title={I18n.t('LanguageSwitcher.title')}
        >
          <Language />
        </IconButton>
        <Menu
          anchorEl={this.state.languageMenu}
          open={Boolean(this.state.languageMenu)}
          onClose={() => this.setState({ languageMenu: null })}
        >
          {
            AppConfig.language.map((item) => {
              if (supportLanguage[item]) {
                const lang = supportLanguage[item];
                return (
                  <MenuItem
                    button
                    key={lang.value}
                    disabled={lang.value === this.props.language}
                    onClick={() => this.props.changeLanguage(lang.value)}
                  >
                    <Translate value={lang.label} />
                    {lang.value === this.props.language ? '' : `(${lang.langLabel})`}
                  </MenuItem>
                );
              }
              return null;
            })
          }
        </Menu>
      </Grid>
    );
  }
}

export default LanguageSwitcher;
