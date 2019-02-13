import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  value: string
}

class TagAction extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Typography variant="subtitle2" color="primary">{`Tag the candidate as ${value || "..."}`}</Typography>
    );
  }
}

export default TagAction;
