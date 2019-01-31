import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import {
	ConnectDragSource,
	DragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd';
import {Item} from '../OptionFlowchart';
import { CommandTypeEnum } from '../../lib/Command'

interface Props extends WithStyles<typeof styles> {
  text: string,
  onOptionSelect : () => void,
  type: CommandTypeEnum
}

interface OptionItemCollectedProps {
	isDragging: boolean
	connectDragSource: ConnectDragSource
}

const optionMenuItemSource = {
  beginDrag(props: any) {
    return {
      onOptionSelect: props.onOptionSelect
    };
  }
};

class OptionMenuItem extends React.Component<Props & OptionItemCollectedProps> {
  render() {
    const { classes, connectDragSource, isDragging, text, type } = this.props;

    return connectDragSource(
      <div className={classes.listItem}>
        <Item type={type} text={text} isDragging={isDragging}/>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  listItem: {
    cursor: 'move',
    marginBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(DragSource(
	"OPTION",
	optionMenuItemSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(OptionMenuItem));
