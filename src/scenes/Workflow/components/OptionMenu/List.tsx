import * as React from 'react';
import { List, createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import OptionMenuItem from '../OptionMenuItem'
import Command from '../../lib/Command'

import { OptionMenuItemModel } from '../../model'

interface Props extends WithStyles<typeof styles> {
  subheader: React.ReactElement<any>,
  items: Array<OptionMenuItemModel>,
  onOptionSelect : (command: Command) => () => void
}

class Options extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { subheader, items, onOptionSelect} = this.props;
    return (
        <List
          subheader={subheader}
        >
          {items.map((item, index) => (
            <OptionMenuItem
              key={index}
              text={item.text}
              onOptionSelect={onOptionSelect(item.command)}>
            </OptionMenuItem>
          ))}
        </List>
    );
  }
}

const styles = (theme: Theme) => createStyles({});

export default withStyles(styles)(Options);
