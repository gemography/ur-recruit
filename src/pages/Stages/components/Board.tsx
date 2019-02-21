import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';
import { StageModel } from '../models';
import Setting from './Setting';

interface Props extends WithStyles<typeof styles> {
  stage: StageModel;
  onUpdate: (_id: string, name: string) => void;
  onDelete: (_id: string) => void;
}

class Workflow extends React.Component<Props> {
  render(): React.ReactNode {
    const { classes, stage, onUpdate, onDelete } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.name}>
          <Typography color="primary" variant="h5">{stage.name}</Typography>
          <div className={classes.setting}>
            <Setting data={stage} onUpdate={onUpdate} onDelete={onDelete} />
          </div>
        </div>
        {stage.candidates.map((candidate, index) =>
          <div className={classes.card} key={index}>
            <Typography variant="subtitle1" color="primary">{candidate.name}</Typography>
            <Typography variant="subtitle2" color="primary">{candidate.email}</Typography>
          </div>
        )}
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: 320,
    margin: theme.spacing.unit * 2,
    height: "fit-content",
    borderRadius: theme.spacing.unit / 4,
  },
  name : {
    paddingBottom: theme.spacing.unit * 2,
    position: "relative"
  },
  setting: {
    position: "absolute",
    top: -theme.spacing.unit,
    right: theme.spacing.unit
  },
  card: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    boxShadow: `0 1px 3px ${theme.palette.primary.light}`
  }
});

export default withStyles(styles)(Workflow);
