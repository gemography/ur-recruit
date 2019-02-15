import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

interface Props {
  value: string
}

class TagEvent extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Typography variant="subtitle1" color="secondary">{`When the candidate gets the tag ${value || "..."}`}</Typography>
    );
  }
}

export default TagEvent;
