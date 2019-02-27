import * as React from 'react';
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
import {
  actionSelectPipeline,
  actionCreateWorkflow,
  actionUpdateWorkflow,
  actionRemoveWorkflow,
} from '../Pipelines/actions';
import { PipelineModel } from '../Pipelines/models';
import { WorkflowModel } from '../Workflows/models';
import CreateForm from '../../components/CreateForm';
import ATSListItem from '../../components/ATSListItem';

interface Props extends WithStyles<typeof styles> {
  selectedPipeline: PipelineModel;
  actionSelectPipeline: any;
  actionCreateWorkflow: any;
  actionUpdateWorkflow: any;
  actionRemoveWorkflow: any;
}

interface State {
  selectedId: string
}

class Workflows extends React.Component<Props, State> {
  state = {
    selectedId: ""
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { selectedPipeline } = nextProps;
    selectedPipeline && selectedPipeline.workflows && this.setSelectedId(selectedPipeline.workflows);
  }

  componentDidMount = () => {
    const { selectedPipeline } = this.props
    selectedPipeline && selectedPipeline.workflows && this.setSelectedId(selectedPipeline.workflows);
  }

  setSelectedId = (workflows: Array<WorkflowModel>) => {
    if(workflows && workflows.length > 0)
      this.setState({selectedId: workflows[0]._id})
  }

  handleSelect = (selectedId: string) => this.setState({selectedId});

  handleCreate = async (name: string) => {
    const { selectedPipeline: { _id }, actionCreateWorkflow} = this.props;
    actionCreateWorkflow(_id, name)
  }

  handleUpdate = async (_id: string, name: string) => {
    const { actionUpdateWorkflow } = this.props;
    actionUpdateWorkflow(_id, name);
  };

  handleDelete = async (_id: string) => {
    const { selectedPipeline, actionRemoveWorkflow } = this.props;
    actionRemoveWorkflow(selectedPipeline._id, _id);
  };

  render(): React.ReactNode {
    const { selectedId } = this.state;
    const { classes, selectedPipeline } = this.props;

    return (
      <div className={classes.root}>
        { selectedPipeline && selectedPipeline.workflows && selectedPipeline.workflows.length > 0?
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
                {selectedPipeline.workflows.map((workflow, index) =>
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
    actionSelectPipeline: bindActionCreators(actionSelectPipeline, dispatch),
    actionCreateWorkflow: bindActionCreators(actionCreateWorkflow, dispatch),
    actionUpdateWorkflow: bindActionCreators(actionUpdateWorkflow, dispatch),
    actionRemoveWorkflow: bindActionCreators(actionRemoveWorkflow, dispatch),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Workflows));
