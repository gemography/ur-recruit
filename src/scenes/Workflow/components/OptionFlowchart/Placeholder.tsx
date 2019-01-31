import * as React from 'react';
import classnames from 'classnames'
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';
import {
	DropTarget,
	DropTargetConnector,
	DropTargetMonitor,
	ConnectDropTarget,
} from 'react-dnd'

interface Props {
  parent: string
}

interface DustbinCollectedProps extends WithStyles<typeof styles> {
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const placeholderTarget = {
  drop(props: Props, monitor: DropTargetMonitor) {
    const { onOptionSelect } = monitor.getItem();
    const { parent } = props;
    onOptionSelect(parent);
  }
};

class Placeholder extends React.Component<Props & DustbinCollectedProps> {
  render() {
    const { classes, connectDropTarget, canDrop, isOver } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div className={classnames({[classes.root]: true, [classes.active]: isActive})}>
        <Typography variant="subtitle2" color="primary">Drop an Option</Typography>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    border: "2px dashed " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit + "px " + theme.spacing.unit * 1.5 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit,
    width: "fit-content",
    margin: "0 auto",
    cursor: "default"
  },
  active: {
    border: "2px solid " + theme.palette.primary.light
  }
});

export default DropTarget(
	"OPTION",
	placeholderTarget,
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)(withStyles(styles)(Placeholder));
