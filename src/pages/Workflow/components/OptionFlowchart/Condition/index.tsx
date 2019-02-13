import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';
import { OptionModel } from '../../../model';

import IfElseCondition from './IfElseCondition'
import WaitCondition from './WaitCondition'

interface Props extends WithStyles<typeof styles> {
  item: OptionModel
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Condition extends React.Component<Props> {
  getSpecificCondition(value: string) {
    const types: ItemTypes = {
      WAIT: <WaitCondition value={value} />,
      IF_ELSE: <IfElseCondition value={value} />
    };
    return types;
  }

  render() {
    const { classes, item } = this.props;
    return (
      <div className={classes.root}>
        { this.getSpecificCondition(item.value)[item.method] }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit,
    width: 256,
    margin: "0 auto",
    minWidth: theme.spacing.unit * 20
  }
});

export default withStyles(styles)(Condition);
