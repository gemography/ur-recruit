import * as React from 'react';
import { Link } from 'react-router-dom'
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';
import { WorkflowModel } from './model'

interface Props extends WithStyles<typeof styles> {
  workflows: Array<WorkflowModel>;
}

class Workflow extends React.Component<Props> {
  render(): React.ReactNode {
    const { classes, workflows } = this.props;

    return (
      <div className={classes.root}>
        { workflows?
          workflows.map((workflow, index) =>
            <Link className={classes.link} to={`/workflows/${workflow._id}`} key={index}>
              <div className={classes.item}>
                <Typography variant="subtitle2" color="secondary">
                  {workflow.name}
                </Typography>
              </div>
            </Link>
          ):
          <div>No workflows</div>
        }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    margin: theme.spacing.unit * 10
  },
  item: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing.unit,
    margin: theme.spacing.unit * 2,
    boxShadow: `0 1px 3px ${theme.palette.primary.light}`
  },
  link: {
    textDecoration: "none"
  }
});

export default withStyles(styles)(Workflow);
