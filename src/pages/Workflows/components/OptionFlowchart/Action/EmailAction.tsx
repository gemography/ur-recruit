import * as React from 'react';
import { Typography, TextField } from '@material-ui/core';
import { Setting } from '../index'
import { OptionModel } from '../../../models';
import InputForm from '../../../../../components/InputForm'

interface Props {
  item: OptionModel;
  isForm?: boolean;
  onUpdate: (_id: string, value: string) => void;
  onDestroy: (_id: string) => void;
}

class EmailAction extends React.Component<Props> {
  handleSave = (value: string) => {
    const { onUpdate, item: {_id} } = this.props;
    !!value && onUpdate(_id, value);
  };
  render() {
    const { item, isForm, onDestroy, onUpdate } = this.props;
    return (
      <>
        {isForm &&
          <Setting
            data={item}
            onDelete={onDestroy}
            onUpdate={onUpdate}
            updateForm={
              <InputForm value={item.value} onSave={this.handleSave} />
            }
          />
        }
        <Typography variant="subtitle2" color="primary" align="center">Email to the candidate</Typography>
      </>
    );
  }
}

export default EmailAction;
