import * as React from 'react';
import { Typography } from '@material-ui/core';
import { OptionModel } from '../../../models';
import { Setting } from '../index'
import Api from '../../../../../services/Api';

interface Props {
  item: OptionModel;
  isForm?: boolean;
  onDestroy: (_id: string) => void;
}

class WebhookEvent extends React.Component<Props> {
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
        <Typography variant="subtitle2" color="secondary" align="center">
          When POST request is sent to
        </Typography>
        <Typography variant="subtitle1" color="secondary" align="center">{`
          ${Api.webhookUrl + item.value || "..."}
        `}</Typography>
      </>
    );
  }
}

export default WebhookEvent;
