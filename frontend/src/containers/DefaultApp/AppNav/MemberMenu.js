import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Manager, Target, Popper } from 'react-popper';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import { PermIdentity } from 'material-ui-icons';

import Grid from 'components/Grid';

import MemberCard from './MemberCardContainer';

const styles = () => ({
  appBar: {
    top: 52,
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class MemberMenu extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
  };
  state = {
    memberMenu: false,
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Manager>
          <Target>
            <div ref={(node) => { this.target1 = node; }} >
              <IconButton
                color="inherit"
                aria-owns={this.state.memberMenu ? 'member-menu' : null}
                aria-haspopup="true"
                onClick={() => this.setState({ memberMenu: !this.state.memberMenu })}
              >
                <PermIdentity />
              </IconButton>
            </div>
          </Target>
          <Popper
            placement="bottom-end"
            eventsEnabled={this.state.memberMenu}
            className={classNames({ [classes.popperClose]: !this.state.memberMenu })}
          >
            <ClickAwayListener
              onClickAway={(event) => {
                if (this.target1.contains(event.target)) {
                  return;
                }
                this.setState({ memberMenu: false });
              }}
            >
              <Collapse in={this.state.memberMenu} id="member-menu" style={{ transformOrigin: '0 0 0' }}>
                <MemberCard />
              </Collapse>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </Grid>
    );
  }
}

export default withStyles(styles)(MemberMenu);
