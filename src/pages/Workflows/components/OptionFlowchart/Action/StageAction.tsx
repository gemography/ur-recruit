import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  value: string
}

class StageAction extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Typography variant="subtitle2" color="primary">{`Send the candidate to stage ${value || "..."}`}</Typography>
    );
  }
}

export default StageAction;
