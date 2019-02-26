import * as React from 'react';
import { Typography } from '@material-ui/core';
import { Setting } from '../index'
import { OptionModel } from '../../../models';

interface Props {
  item: OptionModel;
  isForm?: boolean;
  onDestroy: (_id: string) => void;
}

class DisqualifyAction extends React.Component<Props> {
  render() {
    const { item, isForm, onDestroy } = this.props;
    return (
      <>
        {isForm &&
          <Setting
            data={item}
            onDelete={onDestroy}
          />
        }
        <Typography variant="subtitle2" color="primary">Disqualify the Candidate</Typography>
      </>
    );
  }
}

export default DisqualifyAction;
