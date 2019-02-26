import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

import { OptionModel } from '../../../models';

import StageEvent from './StageEvent'
import TagEvent from './TagEvent'
import WebhookEvent from './WebhookEvent'

interface Props extends WithStyles<typeof styles> {
  item: OptionModel;
  isForm?: boolean;
  onUpdate: (_id: string, value: string) => void;
  onDestroy: (_id: string) => void;
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Event extends React.Component<Props> {

  getSpecificEvent(item: OptionModel) {
    const { isForm, onUpdate, onDestroy } = this.props;
    const types: ItemTypes = {
      STAGE: <StageEvent item={item} isForm={isForm} onUpdate={onUpdate} onDestroy={onDestroy} />,
      TAG: <TagEvent item={item} isForm={isForm} onUpdate={onUpdate} onDestroy={onDestroy} />,
      WEBHOOK: <WebhookEvent item={item} isForm={isForm} onDestroy={onDestroy} />
    };
    return types;
  }

  render() {
    const { classes, item } = this.props;
    return (
      <div className={classes.root}>
        { this.getSpecificEvent(item)[item.method] }
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
