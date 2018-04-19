import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';
import { Redirect } from 'react-router-dom';

import { withStyles, Button, Typography, Paper } from 'material-ui';

import { TextField } from 'components/Field';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const LoginForm = {
  email: '',
  password: '',
};

const LoginFormError = {
  email: [],
  passwords: [],
};

class LoginScreen extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.shape({}).isRequired,
    login: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({}),
    }).isRequired,
  };
  state = {
    loginForm: LoginForm,
    loginFormError: LoginFormError,
  }
  addError = (formError, fieldName, error) => {
    formError[fieldName].push(error);
  }
  login = () => {
    const { loginForm } = this.state;
    const loginFormError = LoginFormError;
    let hasError = false;
    // validate the form
    if (loginForm.email === '') {
      hasError = true;
      this.addError(loginFormError, 'email', <Translate value="LoginScreen.usernameRequired" />);
    }
    if (loginForm.password === '') {
      hasError = true;
      this.addError(loginFormError, 'passwords', <Translate value="LoginScreen.passwordRequired" />);
    }
    if (hasError) {
      this.setState({ loginFormError });
    } else {
      this.props.login(loginForm)
        .then(() => {

        })
        .catch(() => {
          console.log(123);
          this.addError(loginFormError, 'passwords', <Translate value="LoginScreen.PasswordError" />);
          this.setState({ loginFormError });
        });
    }
  }
  render() {
    const { classes, authenticated } = this.props;
    const {
      loginForm, loginFormError,
    } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (authenticated) {
      return <Redirect to={from} />;
    }
    return (
      <Paper className={classes.root}>
        <Typography component={Translate} variant="title" gutterBottom align="center" value="LoginScreen.title" />
        <TextField
          label={(<Translate value="LoginScreen.username" />)}
          name="username"
          type="email"
          value={loginForm.email}
          onChange={e => this.setState({ loginForm: { ...loginForm, email: e.target.value } })}
          error={loginFormError.email.length > 0}
          helperText={loginFormError.email}
        />
        {loginFormError.password}
        <TextField
          label={(<Translate value="LoginScreen.password" />)}
          name="password"
          type="password"
          value={loginForm.password}
          onChange={e => this.setState({ loginForm: { ...loginForm, password: e.target.value } })}
          error={loginFormError.passwords.length > 0}
          helperText={loginFormError.passwords}
        />
        <Button onClick={() => this.login()}>
          <Translate value="LoginScreen.login" />
        </Button>
        <p>
          <small>
            <Translate value="LoginScreen.register" />
            <Button component="a" href="/register">
              <Translate value="LoginScreen.registerButton" />
            </Button>
          </small>
        </p>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginScreen);
