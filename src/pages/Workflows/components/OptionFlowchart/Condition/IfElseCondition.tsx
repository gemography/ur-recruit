import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  value: string;
}

class IfElseCondition extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <>
        <Typography variant="subtitle2" color="primary" align="center">The candidate gets the tag</Typography>
        <Typography variant="subtitle1" color="primary" align="center">{`
          ${value || "..."}
        `}</Typography>
      </>
    );
  }
}

export default IfElseCondition;
