import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  value: string
}

class StageEvent extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Typography variant="subtitle1" color="secondary">{`When the candidate changes to stage ${value || "..."}`}</Typography>
    );
  }
}

export default StageEvent;
