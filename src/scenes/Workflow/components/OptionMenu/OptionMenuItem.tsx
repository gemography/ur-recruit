import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import {
	ConnectDragSource,
	DragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd';

interface Props extends WithStyles<typeof styles> {
  text: string,
  onOptionSelect : () => void;
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
    const { classes, connectDragSource } = this.props;
    return connectDragSource(
      <div className={classes.listItem}>
        text
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  listItem: {
    padding: 8,
    border: "1px solid #000",
    width: "fit-content",
    cursor: 'move',
    backgroundColor: theme.palette.background.default
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
