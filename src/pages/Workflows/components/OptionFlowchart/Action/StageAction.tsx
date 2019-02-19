import * as React from 'react';
import { Typography } from '@material-ui/core';
import { OptionModel } from '../../../models';

interface Props {
  item: OptionModel
}

class StageAction extends React.Component<Props> {
  render() {
    const { item } = this.props;
    return (
      <Typography variant="subtitle2" color="primary">{`Send the candidate to stage ${item.value || "..."}`}</Typography>
    );
  }
}

export default StageAction;
