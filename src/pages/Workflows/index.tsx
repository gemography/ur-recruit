import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  Grid,
} from '@material-ui/core';
import Api from '../../services/Api';
import { actionSelectPipeline } from '../Pipelines/actions'
import { PipelineModel } from '../Pipelines/models'
import { WorkflowModel } from '../Workflows/models'
import CreateForm from '../../components/CreateForm';

interface Props extends WithStyles<typeof styles> {
  selectedPipeline: PipelineModel;
  actionSelectPipeline: any
}

interface State {
  workflowId: string
}

class Workflows extends React.Component<Props, State> {
  state = {
    workflowId: ""
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { selectedPipeline: {workflows} } = nextProps;
    this.setWorkflowId(workflows);
  }
  componentDidMount = () => {
    const { selectedPipeline: {workflows} } = this.props
    this.setWorkflowId(workflows);
  }

  setWorkflowId = (workflows: Array<WorkflowModel>) => {
    if(workflows && workflows.length > 0)
      this.setState({workflowId: workflows[0]._id})
  }

  handleWorkflowSelect = (workflowId: string) => this.setState({workflowId})
  handleWorkflowCreate = async (name: string) => {
    const {  selectedPipeline, actionSelectPipeline } = this.props;
    const { data: {workflow} } = await axios.post(
      `${Api.baseUrl}/pipelines/${selectedPipeline._id}/workflows`,
      { name }
    );
    actionSelectPipeline({
      ...selectedPipeline,
      workflows: [...selectedPipeline.workflows, workflow] })
    this.setState({workflowId: workflow._id})
  }

  render(): React.ReactNode {
    const { workflowId } = this.state;
    const { classes, selectedPipeline: {workflows} } = this.props;

    return (
      <div className={classes.root}>
        { workflows && workflows.length > 0?
          <Grid container>
            <Grid item>
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div">
                    Workflows
                    <CreateForm onSave={this.handleWorkflowCreate}/>
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
  }
});

function mapStateToProps(state: any) {
  const { selectedPipeline } = state.pipelineReducer

  return {
    selectedPipeline
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actionSelectPipeline: bindActionCreators(actionSelectPipeline, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Workflows));
