import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogContent } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import Loading from './Loading';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const LoadingScreen = ({ loading, handleClose }) => (
  <Dialog
    open={loading}
    transition={Transition}
    keepMounted
    disableBackdropClick
    disableEscapeKeyDown
    onClose={handleClose}
  >
    <DialogContent style={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Loading />
    </DialogContent>
  </Dialog>
);

LoadingScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LoadingScreen;
