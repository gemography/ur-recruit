import * as React from 'react';
import { Typography } from '@material-ui/core';
import { OptionModel } from '../../../models';

interface Props {
  item: OptionModel;
}

class IfElseCondition extends React.Component<Props> {
  render() {
    const { item } = this.props;
    return (
      <Typography variant="subtitle2" color="primary">{`if the candidate ${item.value || "..."}`}</Typography>
    );
  }
}

export default IfElseCondition;
