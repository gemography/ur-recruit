import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Show from '../../pages/Workflows/components/Show';
import {
  Theme,
  WithStyles,
  withStyles,
  createStyles,
  List,
  ListSubheader,
  Grid,
} from '@material-ui/core';
import Api from '../../services/Api';
import { actionSelectPipeline } from '../Pipelines/actions'
import { PipelineModel } from '../Pipelines/models'
import { WorkflowModel } from '../Workflows/models'
import CreateForm from '../../components/CreateForm';
import ATSListItem from '../../components/ATSListItem';

interface Props extends WithStyles<typeof styles> {
  selectedPipeline: PipelineModel;
  actionSelectPipeline: any
}

interface State {
  selectedId: string
}

class Workflows extends React.Component<Props, State> {
  state = {
    selectedId: ""
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { selectedPipeline: {workflows} } = nextProps;
    this.setSelectedId(workflows);
  }

  componentDidMount = () => {
    const { selectedPipeline: {workflows} } = this.props
    this.setSelectedId(workflows);
  }

  setSelectedId = (workflows: Array<WorkflowModel>) => {
    if(workflows && workflows.length > 0)
      this.setState({selectedId: workflows[0]._id})
  }

  handleSelect = (selectedId: string) => this.setState({selectedId});

  handleCreate = async (name: string) => {
    const {  selectedPipeline, actionSelectPipeline } = this.props;
    const { data: {workflow} } = await axios.post(
      `${Api.baseUrl}/pipelines/${selectedPipeline._id}/workflows`,
      { name }
    );
    actionSelectPipeline({
      ...selectedPipeline,
      workflows: [...selectedPipeline.workflows, workflow] });
    this.setState({selectedId: workflow._id})
  }

  handleUpdate = async (_id: string, name: string) => {
    const { selectedPipeline, actionSelectPipeline } = this.props;
    await axios.put(
      `${Api.baseUrl}/workflows/${_id}`, {
      name
    });
    selectedPipeline.workflows.filter(workflow=> workflow._id === _id)[0].name = name
    debugger
    actionSelectPipeline({...selectedPipeline});
  };

  handleDelete = async (_id: string) => {
    const {  selectedPipeline, actionSelectPipeline } = this.props;
    await axios.delete(`${Api.baseUrl}/pipelines/${selectedPipeline._id}/workflows/${_id}`);
    actionSelectPipeline({
      ...selectedPipeline,
      workflows: [
        ...selectedPipeline.workflows.filter(workflow=> workflow._id !== _id)
      ]
    });
  };

  render(): React.ReactNode {
    const { selectedId } = this.state;
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
                    <CreateForm onSave={this.handleCreate}/>
                  </ListSubheader>
                }
                className={classes.list}
              >
                {workflows.map((workflow, index) =>
                  <ATSListItem
                    key={index}
                    data={workflow}
                    isSelected={workflow._id === selectedId}
                    onSelect={() => this.handleSelect(workflow._id)}
                    onCreate={this.handleCreate}
                    onUpdate={this.handleUpdate}
                    onDelete={this.handleDelete}
                  />
                )}
              </List>
            </Grid>
            <Grid item>
              {!!selectedId && <Show workflowId={selectedId}></Show> }
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
