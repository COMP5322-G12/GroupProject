import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const style = () => ({
  card: {
    minWidth: 300,
    border: '0.5px solid #ccc',
  },
});

const MemberCard = ({
  classes, authenticated, me,
}) => (
  <Card className={classes.card} raised elevation={24} square>
    <CardHeader
      avatar={
        me.ImagePath && me.ImagePath !== '' ?
          <Avatar
            aria-label={`${me.FirstName ? me.FirstName : ''} ${me.MiddleName ? me.MiddleName : ''} ${me.LastName ? me.LastName : ''}`}
            src={me.ImagePath}
            alt={`${me.FirstName ? me.FirstName : ''} ${me.MiddleName ? me.MiddleName : ''} ${me.LastName ? me.LastName : ''}`}
          /> :
          <Avatar
            aria-label={`${me.FirstName ? me.FirstName : ''} ${me.MiddleName ? me.MiddleName : ''} ${me.LastName ? me.LastName : ''}`}
          >
            {me.FirstName ? me.FirstName[0] : ''}{me.LastName ? me.LastName[0] : ''}
          </Avatar>
      }
      title={(<Translate value="MemberCard.hello" fullName={`${me.FirstName ? me.FirstName : ''} ${me.MiddleName ? me.MiddleName : ''} ${me.LastName ? me.LastName : ''}`} />)}
    />
    {
      authenticated ?
        <CardActions>
          <Button component="a" href="/logout">
            <Translate value="MemberCard.logout" />
          </Button>
        </CardActions> :
        <CardActions>
          <Button component="a" href="/login">
            <Translate value="MemberCard.login" />
          </Button>
          <Button component="a" href="/register">
            <Translate value="MemberCard.register" />
          </Button>
        </CardActions>
    }
  </Card>
);


MemberCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  authenticated: PropTypes.bool.isRequired,
  me: PropTypes.shape({}).isRequired,
};

export default withStyles(style)(MemberCard);
