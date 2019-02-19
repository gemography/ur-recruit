import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

import { OptionModel } from '../../../models';

import StageEvent from './StageEvent'
import TagEvent from './TagEvent'
import WebhookEvent from './WebhookEvent'

interface Props extends WithStyles<typeof styles> {
  item: OptionModel
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Event extends React.Component<Props> {

  getSpecificEvent(value: string) {
    const types: ItemTypes = {
      STAGE: <StageEvent value={value} />,
      TAG: <TagEvent value={value} />,
      WEBHOOK: <WebhookEvent value={value} />
    };
    return types;
  }

  render() {
    const { classes, item } = this.props;
    return (
      <div className={classes.root}>
        { this.getSpecificEvent(item.value)[item.method] }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit,
    width: 256,
    margin: "0 auto"
  }
});

export default withStyles(styles)(Event);
