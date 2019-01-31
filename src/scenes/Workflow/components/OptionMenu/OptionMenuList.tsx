import * as React from 'react';
import { List, createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import OptionMenuItem from './OptionMenuItem'
import Command from '../../lib/Command'

import { OptionMenuItemModel } from '../../model'

interface Props extends WithStyles<typeof styles> {
  items: Array<OptionMenuItemModel>,
  onOptionSelect : (command: Command) => (parent: string) => void
}

class OptionMenuList extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { items, onOptionSelect} = this.props;
    return (
      <>
        {items.map((item, index) => (
          <OptionMenuItem
            key={index}
            text={item.text}
            onOptionSelect={onOptionSelect(item.command)}>
          </OptionMenuItem>
        ))}
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({});

export default withStyles(styles)(OptionMenuList);
