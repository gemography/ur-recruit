import * as React from 'react';
import classnames from 'classnames'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import { Action, Event, Condition} from './index';
import { CommandTypeEnum } from '../../lib/Command'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

interface Props extends WithStyles<typeof styles> {
  type: CommandTypeEnum
  text: string
  isDragging?: boolean
  onDestroy?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
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
    const { type, text, isDragging, onDestroy, classes } = this.props;

    return (
      <div className={classes.root}>
        {onDestroy && <CancelOutlinedIcon onClick={onDestroy} className={classes.cancel}></CancelOutlinedIcon>}
        <div className={classnames({[classes.dragging]: isDragging})}>
          { this.getSpecificItem(text)[type] }
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
    width: "fit-content",
    margin: "0 auto",
    "&:hover": {
      '& *': {
        visibility: 'inherit',
      },
    }
  },
  cancel: {
    position: "absolute",
    right: -theme.spacing.unit,
    top: -theme.spacing.unit,
    cursor: "pointer",
    visibility: 'hidden'
  },
  dragging: {
    opacity: 0.4
  }
});

export default withStyles(styles)(Item);
