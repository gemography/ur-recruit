import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  value: string
}

class IfElseCondition extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Typography variant="subtitle2" color="primary">{`if the candidate ${value || "..."}`}</Typography>
    );
  }
}

export default IfElseCondition;
