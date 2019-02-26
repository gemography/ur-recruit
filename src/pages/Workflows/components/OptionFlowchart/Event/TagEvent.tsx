import * as React from 'react';
import { Typography } from '@material-ui/core';
import { OptionModel } from '../../../models';
import { Setting } from '../index'

interface Props {
  item: OptionModel;
  isForm?: boolean;
  onUpdate: (_id: string, value: string) => void;
  onDestroy: (_id: string) => void;
}

class TagEvent extends React.Component<Props> {
  render() {
    const { item, isForm, onUpdate, onDestroy } = this.props;
    return (
      <>
        {isForm &&
          <Setting
            data={item}
            onUpdate={onUpdate}
            onDelete={onDestroy}
          />
        }
        <Typography variant="subtitle2" color="secondary" align="center">The candidate gets the tag</Typography>
        <Typography variant="subtitle1" color="secondary" align="center">{`
          ${item.value || "..."}
        `}</Typography>
      </>
    );
  }
}

export default TagEvent;
