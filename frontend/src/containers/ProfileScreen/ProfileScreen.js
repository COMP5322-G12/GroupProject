import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-i18nify';

import { withStyles, Typography, Avatar } from 'material-ui';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { ModeEdit, Save } from 'material-ui-icons';

import Grid from 'components/Grid';
import { TextField, DropDown } from 'components/Field';
import Base64 from 'helpers/Base64';
import ProfileHelper from 'helpers/Profile';


const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    minWidth: 300,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 50,
  },
  fab: {
    position: 'fixed',
    right: 35,
    bottom: 35,
  },
});

class ProfileScreen extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    me: PropTypes.shape({
      BirthYear: PropTypes.string.isRequired,
      BirthMonth: PropTypes.string.isRequired,
      BirthDay: PropTypes.string.isRequired,
    }).isRequired,
    changeProfile: PropTypes.func.isRequired,
    changeProfilePic: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      profile: {
        ...props.me,
        image: null,
        ImageName: '',
        birthday: `${props.me.BirthYear}-${props.me.BirthMonth}-${props.me.BirthDay}`,
      },
      profileError: {
        FirstName: [],
        MiddleName: [],
        LastName: [],
        Gender: [],
        Building: [],
        Street: [],
        City: [],
        State: [],
        ContactPhone: [],
        birthday: [],
        image: [],
      },
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      edit: false,
      profile: {
        ...newProps.me,
        image: null,
        ImageName: '',
        birthday: `${newProps.me.BirthYear}-${newProps.me.BirthMonth}-${newProps.me.BirthDay}`,
      },
    });
  }
  validateProfile = (profile) => {
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
      ContactPhone: [],
      birthday: [],
      image: [],
    };
    const { profileError } = this.state;
    if (profile.FirstName === '') {
      hasError = true;
      error.FirstName.push('First Name is Required');
    }
    if (profile.LastName === '') {
      hasError = true;
      error.LastName.push('Last name is required');
    }
    if (profile.Gender === '') {
      hasError = true;
      error.Gender.push('Gender is required');
    }
    if (profile.birthday === '') {
      hasError = true;
      error.birthday.push('Birthday is required');
    }
    if (profile.ContactPhone === '') {
      hasError = true;
      error.ContactPhone.push('Contact Phone is required');
    }
    this.setState({
      profileError: { ...profileError, ...error },
    });
    return !hasError;
  }
  updateProfile = profile => new Promise(async (resolve, reject) => {
    const { birthday, ...rest } = profile;
    if (!this.validateProfile(profile)) {
      reject(new Error(''));
    } else {
      const finalForm = {
        ...rest,
        ...ProfileHelper.convertBirthday(birthday),
        image: null,
        IPAddress: '127.0.0.1',
      };
      resolve(await this.props.changeProfile(finalForm));
    }
  });
  updateImage = image => new Promise(async (resolve) => {
    if (image.image) {
      const base64 = await Base64.encode(image.image);
      resolve(await this.props.changeProfilePic({
        ImageName: image.ImageName,
        ImagePath: base64,
        IPAddress: '127.0.0.1',
      }));
    } else {
      resolve(true);
    }
  })
  changeProfile = () => {
    const {
      profile: {
        image, ImagePath, ImageName, ...rest
      },
    } = this.state;
    Promise.all([this.updateProfile(rest), this.updateImage({ image, ImageName })])
      .then((response) => {
        if (response[0] && response[1]) {
          window.location.reload();
          this.setState({ edit: !this.state.edit });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { classes, me } = this.props;
    const { profile, edit, profileError } = this.state;
    return (
      <div className={classes.root}>
        <Typography component={Translate} variant="title" gutterBottom align="center" value="ProfileScreen.title" />
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          {
            me.ImagePath && me.ImagePath !== '' ?
              <Avatar
                style={{ width: 100, height: 100 }}
                aria-label={`${me.FirstName ? me.FirstName : ''} ${me.MiddleName ? me.MiddleName : ''} ${me.LastName ? me.LastName : ''}`}
                src={me.ImagePath}
                alt={`${me.FirstName ? me.FirstName : ''} ${me.MiddleName ? me.MiddleName : ''} ${me.LastName ? me.LastName : ''}`}
              /> :
              <Avatar
                style={{ width: 100, height: 100 }}
                aria-label={`${me.FirstName ? me.FirstName : ''} ${me.MiddleName ? me.MiddleName : ''} ${me.LastName ? me.LastName : ''}`}
              >
                {me.FirstName ? me.FirstName[0] : ''}{me.LastName ? me.LastName[0] : ''}
              </Avatar>
          }
        </div>
        <Card className={classes.card}>
          <CardHeader title={<Translate value="ProfileScreen.AccountInformation" />} />
          <CardContent>
            <TextField
              label={(<Translate value="ProfileScreen.username" />)}
              name="username"
              type="EMail"
              value={profile.EMail}
              disabled
            />
            <TextField
              label={(<Translate value="ProfileScreen.password" />)}
              name="password"
              type="password"
              value="password"
              disabled
            />
            <TextField
              label={(<Translate value="ProfileScreen.profileImageSrc" />)}
              name="image"
              value={profile.image ? profile.ImageName : ''}
              disabled={!edit}
              type="file"
              inputProps={{
                accept: 'image/png',
              }}
              onChange={(e) => {
                const file = e.target.files[0];
                this.setState({ profile: { ...profile, image: file, ImageName: e.target.value } });
              }}
            />
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader title={<Translate value="ProfileScreen.PersonalInformation" />} />
          <CardContent>
            <Grid>
              <TextField
                label={(<Translate value="ProfileScreen.firstName" />)}
                name="FirstName"
                value={profile.FirstName}
                disabled={!edit}
                onChange={e => this.setState({
                  profile: { ...profile, FirstName: e.target.value },
                })}
                error={profileError.FirstName.length > 0}
                helperText={profileError.FirstName}
              />
              <TextField
                label={(<Translate value="ProfileScreen.middleName" />)}
                name="MiddleName"
                value={profile.MiddleName}
                disabled={!edit}
                onChange={e => this.setState({
                  profile: { ...profile, MiddleName: e.target.value },
                })}
                error={profileError.MiddleName.length > 0}
                helperText={profileError.MiddleName}
              />
              <TextField
                label={(<Translate value="ProfileScreen.lastName" />)}
                name="LastName"
                value={profile.LastName}
                disabled={!edit}
                onChange={e => this.setState({
                  profile: { ...profile, LastName: e.target.value },
                })}
                error={profileError.LastName.length > 0}
                helperText={profileError.LastName}
              />
            </Grid>
            <DropDown
              label={(<Translate value="ProfileScreen.gender" />)}
              name="gender"
              value={profile.Gender}
              options={[
                { label: I18n.t('ProfileScreen.genderM'), value: 'M' },
                { label: I18n.t('ProfileScreen.genderF'), value: 'F' },
              ]}
              disabled={!edit}
              onChange={e => this.setState({ profile: { ...profile, gender: e.target.value } })}
              error={profileError.Gender.length > 0}
              helperText={profileError.Gender}
            />
            <TextField
              label={(<Translate value="ProfileScreen.birthday" />)}
              name="birthday"
              type="date"
              value={profile.birthday}
              disabled={!edit}
              onChange={e => this.setState({ profile: { ...profile, birthday: e.target.value } })}
              error={profileError.birthday.length > 0}
              helperText={profileError.birthday}
            />
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader title={<Translate value="ProfileScreen.ContactInformation" />} />
          <CardContent>
            <TextField
              label={(<Translate value="ProfileScreen.building" />)}
              name="Building"
              value={profile.Building}
              disabled={!edit}
              onChange={e => this.setState({
                profile: { ...profile, Building: e.target.value },
              })}
              error={profileError.Building.length > 0}
              helperText={profileError.Building}
            />
            <TextField
              label={(<Translate value="ProfileScreen.street" />)}
              name="Street"
              value={profile.Street}
              disabled={!edit}
              onChange={e => this.setState({
                profile: { ...profile, Street: e.target.value },
              })}
              error={profileError.Street.length > 0}
              helperText={profileError.Street}
            />
            <TextField
              label={(<Translate value="ProfileScreen.city" />)}
              name="City"
              value={profile.City}
              disabled={!edit}
              onChange={e => this.setState({
                profile: { ...profile, City: e.target.value },
              })}
              error={profileError.City.length > 0}
              helperText={profileError.City}
            />
            <TextField
              label={(<Translate value="ProfileScreen.state" />)}
              name="state"
              value={profile.State}
              disabled={!edit}
              onChange={e => this.setState({ profile: { ...profile, State: e.target.value } })}
              error={profileError.State.length > 0}
              helperText={profileError.State}
            />
            <TextField
              label={(<Translate value="ProfileScreen.phone" />)}
              name="ContactPhone"
              value={profile.ContactPhone}
              disabled={!edit}
              onChange={e => this.setState({
                profile: { ...profile, ContactPhone: e.target.value },
              })}
              error={profileError.ContactPhone.length > 0}
              helperText={profileError.ContactPhone}
            />
          </CardContent>
        </Card>
        <Button
          variant="fab"
          className={classes.fab}
          color="secondary"
          onClick={() => {
            if (this.state.edit) {
              this.changeProfile();
            } else {
              this.setState({ edit: !this.state.edit });
            }
          }}
        >
          {edit ? <Save /> : <ModeEdit />}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileScreen);
