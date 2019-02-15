import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {}

class DisqualifyAction extends React.Component<Props> {
  render() {
    return (
      <Typography variant="subtitle2" color="primary">Disqualify the Candidate</Typography>
    );
  }
}

export default DisqualifyAction;
