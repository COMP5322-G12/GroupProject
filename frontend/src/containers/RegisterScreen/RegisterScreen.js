import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-i18nify';
import { Redirect } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import { TextField, DropDown } from 'components/Field';
import Grid from 'components/Grid';
import ProfileHelper from 'helpers/Profile';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const RegisterForm = {
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Gender: 'M',
  BirthDay: '',
  BirthMonth: '',
  BirthYear: '',
  Building: '',
  Street: '',
  City: '',
  State: '',
  Zip: '',
  EMail: '',
  Password: '',
  passwordRetype: '',
  ContactPhone: '',
  IPAddress: '127.0.0.1',
  birthday: '',
  ImageName: '',
  image: null,
};

class RegisterScreen extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    register: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({}),
    }).isRequired,
  }
  state = {
    registerForm: RegisterForm,
    registerFormError: {
      FirstName: [],
      MiddleName: [],
      LastName: [],
      Gender: [],
      Building: [],
      Street: [],
      City: [],
      State: [],
      EMail: [],
      Password: [],
      passwordRetype: [],
      ContactPhone: [],
      birthday: [],
      image: [],
    },
  }
  validateRegisterForm = (registerForm) => {
    let hasError = false;
    const error = {
      FirstName: [],
      MiddleName: [],
      LastName: [],
      Gender: [],
      Building: [],
      Street: [],
      City: [],
      State: [],
      EMail: [],
      Password: [],
      passwordRetype: [],
      ContactPhone: [],
      birthday: [],
      image: [],
    };
    const { registerFormError } = this.state;
    if (registerForm.EMail === '') {
      hasError = true;
      error.EMail.push('Email is required');
    }
    if (registerForm.Password === '') {
      hasError = true;
      error.Password.push('Password is required');
    }
    if (registerForm.passwordRetype === '') {
      hasError = true;
      error.passwordRetype.push('Password is required');
    }
    if (registerForm.Password.length < 4 || registerForm.Password.length > 12) {
      hasError = true;
      error.Password.push('Password length should be 4- 12 digits');
    }
    if (registerForm.passwordRetype.length < 4 || registerForm.passwordRetype.length > 12) {
      hasError = true;
      error.passwordRetype.push('Password length should be 4- 12 digits');
    }
    if (registerForm.FirstName === '') {
      hasError = true;
      error.FirstName.push('First Name is Required');
    }
    if (registerForm.LastName === '') {
      hasError = true;
      error.LastName.push('Last name is required');
    }
    if (registerForm.Gender === '') {
      hasError = true;
      error.Gender.push('Gender is required');
    }
    if (registerForm.birthday === '') {
      hasError = true;
      error.birthday.push('Birthday is required');
    }
    if (registerForm.ContactPhone === '') {
      hasError = true;
      error.ContactPhone.push('Contact Phone is required');
    }
    this.setState({
      registerFormError: { ...registerFormError, ...error },
    });
    return !hasError;
  }
  register() {
    const { registerForm } = this.state;
    if (this.validateRegisterForm(registerForm)) {
      const {
        birthday, passwordRetype, ...rest
      } = this.state.registerForm;
      this.props.register({
        ...rest,
        ...ProfileHelper.convertBirthday(birthday),
      });
    }
  }
  render() {
    const { classes, authenticated } = this.props;
    const { registerForm, registerFormError } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (authenticated) {
      return <Redirect to={from} />;
    }
    return (
      <Paper className={classes.root}>
        <Typography component={Translate} variant="title" gutterBottom align="center" value="RegisterScreen.title" />
        <form onSubmit={(event) => { event.preventDefault(); this.register(); }}>
          <TextField
            label={(<Translate value="RegisterScreen.username" />)}
            name="EMail"
            type="email"
            value={registerForm.EMail}
            onChange={e => this.setState({
              registerForm: { ...registerForm, EMail: e.target.value },
            })}
            required
            error={registerFormError.EMail.length > 0}
            helperText={registerFormError.EMail}
          />
          <TextField
            label={(<Translate value="RegisterScreen.password" />)}
            name="Password"
            type="password"
            value={registerForm.Password}
            onChange={e => this.setState({
              registerForm: { ...registerForm, Password: e.target.value },
            })}
            required
            error={registerFormError.Password.length > 0}
            helperText={registerFormError.Password}
          />
          <TextField
            label={(<Translate value="RegisterScreen.passwordRetype" />)}
            name="passwordRetype"
            type="password"
            value={registerForm.passwordRetype}
            onChange={e => this.setState({
              registerForm: { ...registerForm, passwordRetype: e.target.value },
            })}
            required
            error={registerFormError.passwordRetype.length > 0}
            helperText={registerFormError.passwordRetype}
          />
          <Grid>
            <TextField
              label={(<Translate value="RegisterScreen.firstName" />)}
              name="FirstName"
              value={registerForm.FirstName}
              onChange={e => this.setState({
                registerForm: { ...registerForm, FirstName: e.target.value },
              })}
              required
              error={registerFormError.FirstName.length > 0}
              helperText={registerFormError.FirstName}
            />
            <TextField
              label={(<Translate value="RegisterScreen.middleName" />)}
              name="MiddleName"
              value={registerForm.MiddleName}
              onChange={e => this.setState({
                registerForm: { ...registerForm, MiddleName: e.target.value },
              })}
              error={registerFormError.MiddleName.length > 0}
              helperText={registerFormError.MiddleName}
            />
            <TextField
              label={(<Translate value="RegisterScreen.lastName" />)}
              name="LastName"
              value={registerForm.LastName}
              onChange={e => this.setState({
                registerForm: { ...registerForm, LastName: e.target.value },
              })}
              required
              error={registerFormError.LastName.length > 0}
              helperText={registerFormError.LastName}
            />
          </Grid>
          <DropDown
            label={(<Translate value="RegisterScreen.gender" />)}
            name="Gender"
            value={registerForm.Gender}
            options={[
              { label: I18n.t('RegisterScreen.genderM'), value: 'M' },
              { label: I18n.t('RegisterScreen.genderF'), value: 'F' },
            ]}
            onChange={e => this.setState({
              registerForm: { ...registerForm, Gender: e.target.value },
            })}
            required
            error={registerFormError.Gender.length > 0}
            helperText={registerFormError.Gender}
          />
          <TextField
            label={(<Translate value="RegisterScreen.birthday" />)}
            name="birthday"
            type="date"
            value={registerForm.birthday}
            onChange={e => this.setState({
              registerForm: { ...registerForm, birthday: e.target.value },
            })}
            required
            error={registerFormError.birthday.length > 0}
            helperText={registerFormError.birthday}
          />
          <TextField
            label={(<Translate value="RegisterScreen.building" />)}
            name="Building"
            value={registerForm.Building}
            onChange={e => this.setState({
              registerForm: { ...registerForm, Building: e.target.value },
            })}
            error={registerFormError.Building.length > 0}
            helperText={registerFormError.Building}
          />
          <TextField
            label={(<Translate value="RegisterScreen.street" />)}
            name="Street"
            value={registerForm.Street}
            onChange={e => this.setState({
              registerForm: { ...registerForm, Street: e.target.value },
            })}
            error={registerFormError.Street.length > 0}
            helperText={registerFormError.Street}
          />
          <TextField
            label={(<Translate value="RegisterScreen.city" />)}
            name="City"
            value={registerForm.City}
            onChange={e => this.setState({
              registerForm: { ...registerForm, City: e.target.value },
            })}
            error={registerFormError.City.length > 0}
            helperText={registerFormError.City}
          />
          <TextField
            label={(<Translate value="RegisterScreen.state" />)}
            name="State"
            value={registerForm.State}
            onChange={e => this.setState({
              registerForm: { ...registerForm, State: e.target.value },
            })}
            error={registerFormError.State.length > 0}
            helperText={registerFormError.State}
          />
          <TextField
            label={(<Translate value="RegisterScreen.phone" />)}
            name="ContactPhone"
            value={registerForm.ContactPhone}
            onChange={e => this.setState({
              registerForm: { ...registerForm, ContactPhone: e.target.value },
            })}
            required
            error={registerFormError.ContactPhone.length > 0}
            helperText={registerFormError.ContactPhone}
          />
          <TextField
            label={(<Translate value="ProfileScreen.profileImageSrc" />)}
            name="image"
            value={registerForm.image ? registerForm.ImageName : ''}
            type="file"
            inputProps={{
              accept: 'image/png',
            }}
            onChange={(e) => {
              const file = e.target.files[0];
              this.setState({
                registerForm: { ...registerForm, image: file, ImageName: e.target.value },
              });
            }}
            error={registerFormError.image.length > 0}
            helperText={registerFormError.image}
          />
          <Button type="submit">
            <Translate value="RegisterScreen.register" />
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(RegisterScreen);
