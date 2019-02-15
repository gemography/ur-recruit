import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props { }

class EmailAction extends React.Component<Props> {
  render() {
    return (
      <Typography variant="subtitle2" color="primary">Email to the candidate</Typography>
    );
  }
}

export default EmailAction;
