import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  value: string;
}

class WaitCondition extends React.Component<Props> {
  render() {
    const { value } = this.props;

    return (
      <Typography variant="subtitle2" color="primary">{`Go to the next step ${value || "in ..."}`}</Typography>
    );
  }
}

export default WaitCondition;
