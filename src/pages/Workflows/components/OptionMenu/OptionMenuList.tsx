import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';
import OptionMenuItem from './OptionMenuItem'
import Command from '../../lib/Command'
import { CommandTypeEnum } from '../../lib/Command'
import { OptionMenuItemModel } from '../../models'

interface Props extends WithStyles<typeof styles> {
  items: Array<OptionMenuItemModel>,
  onOptionSelect : (command: Command) => (parent: string) => void
}

interface OptionMenuHeaders {
  [key:string]: string;
}

class OptionMenuList extends React.PureComponent<Props> {

  getHeaderTitle() {
    const types: OptionMenuHeaders = {
      EVENT: "Events",
      CONDITION: "Conditions",
      ACTION: "Actions"
    };
    return types;
  }

  render(): React.ReactNode {
    const { classes, items, onOptionSelect} = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.text} color="primary" variant="h5">{this.getHeaderTitle()[CommandTypeEnum[items[0].option.type]]}</Typography>
        {items.map((item, index) => (
          <OptionMenuItem
            key={index}
            item={item.option}
            onOptionSelect={onOptionSelect(item.command)}>
          </OptionMenuItem>
        ))}
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 2
  },
  text: {
    marginBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(OptionMenuList);
