import * as React from 'react';
import classnames from 'classnames'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import { Action, Event, Condition} from './index';
import { CommandTypeEnum } from '../../lib/Command'

interface Props extends WithStyles<typeof styles> {
  type: CommandTypeEnum
  text: string
  isDragging?: boolean
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Item extends React.Component<Props> {
  getSpecificItem(text: string) {
    const types: ItemTypes = {
      EVENT: <Event>{text}</Event>,
      ACTION: <Action>{text}</Action>,
      CONDITION: <Condition>{text}</Condition>
    };
    return types;
  }

  render() {
    const { type, text, isDragging, classes } = this.props;

    return (
      <div className={classnames({[classes.dragging]: isDragging})}> { this.getSpecificItem(text)[type] } </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  dragging: {
    opacity: 0.4
  }
});

export default withStyles(styles)(Item);
