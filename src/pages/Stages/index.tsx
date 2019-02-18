import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import Board from './components/Board'
import { StageModel } from './model'

interface Props extends WithStyles<typeof styles> {
  stages: Array<StageModel>
}

class Stages extends React.Component<Props> {
  render(): React.ReactNode {
    const { classes, stages } = this.props;

    return (
      <div className={classes.root}>
       { stages && stages.length > 0?
          stages.map((stage, index) =>
            <Board key={index} stage={stage}></Board>
          ):
          <div>No stages</div>
        }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    margin: theme.spacing.unit * 4,
    marginTop: 0
  }
});

export default withStyles(styles)(Stages);
