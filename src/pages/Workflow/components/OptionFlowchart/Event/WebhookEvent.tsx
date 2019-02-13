import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  value: string
}

class WebhookEvent extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Typography variant="subtitle1" color="secondary">{`When the webhook with the id ${value || "..."} is called`}</Typography>
    );
  }
}

export default WebhookEvent;
