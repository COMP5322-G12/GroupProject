import React from 'react';
import { Translate } from 'react-i18nify';

import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';


const Loading = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <CircularProgress color="primary" size={30} />
    &nbsp;&nbsp;
    <Typography variant="body1"><Translate value="LoadingDialog.loading" /></Typography>
    ...
  </div>
);

export default Loading;
