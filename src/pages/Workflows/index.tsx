import * as React from 'react';
import { connect } from 'react-redux';
import Show from '../../pages/Workflows/components/Show';
import {
  Theme,
  ListItem,
  WithStyles,
  withStyles,
  createStyles,
  List,
  ListItemText,
  ListSubheader,
  IconButton,
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { WorkflowModel } from './models'

interface Props extends WithStyles<typeof styles> {
  workflows: Array<WorkflowModel>;
}

interface State {
  workflowId: string
}

class Workflows extends React.Component<Props, State> {
  state = {
    workflowId: ""
  }

  handleWorkflowSelect = (workflowId: string) => this.setState({workflowId})

  render(): React.ReactNode {
    const { workflowId } = this.state;
    const { classes, workflows } = this.props;

    return (
      <div className={classes.root}>
        { workflows && workflows.length > 0?
          <Grid container>
            <Grid item>
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div">
                    Create a workflow
                    <IconButton aria-label="AddWorkflow" className={classes.addIcon}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </ListSubheader>
                }
                className={classes.list}
              >
                {workflows.map(workflow =>
                  <ListItem selected={workflow._id === workflowId} key={workflow._id} button onClick={() => this.handleWorkflowSelect(workflow._id)}>
                    <ListItemText primary={workflow.name} />
                  </ListItem>
                )}
              </List>
            </Grid>
            <Grid item>
              {!!workflowId && <Show workflowId={workflowId}></Show> }
            </Grid>
          </Grid>:
          <div>No workflows</div>
        }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {},
  item: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing.unit,
    margin: theme.spacing.unit * 2,
    boxShadow: `0 1px 3px ${theme.palette.primary.light}`,
    cursor: "pointer",
  },
  list: {
    height: "calc(100vh - 112px)",
    minWidth: 240,
    backgroundColor: theme.palette.common.white,
    borderRight: "1px solid rgba(0, 0, 0, 0.12)"
  },
  addIcon: {
    position: "absolute",
    right: 8,
    top: 2,
    cursor: "pointer"
  }
});

function mapStateToProps(state: any) {
  const { selectedPipeline: {workflows} } = state.pipelineReducer

  return {
    workflows
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Workflows));
