import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from '@material-ui/core';
import {
  actionCreateStage,
  actionUpdateStage,
  actionRemoveStage,
} from '../Pipelines/actions';
import Board from './components/Board';
import Create from './components/Create';
import EmptyState from '../../components/EmptyState';
import UpdatePopover from '../../components/UpdatePopover';
import { PipelineModel } from '../Pipelines/models';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';

interface Props extends WithStyles<typeof styles> {
  selectedPipeline: PipelineModel;
  actionCreateStage: any;
  actionUpdateStage: any;
  actionRemoveStage: any;
}

class Stages extends React.Component<Props> {
  state = {
    anchorEl: null
  }

  open = (event: any) => this.setState({anchorEl: event.currentTarget});
  close = () => this.setState({anchorEl: null});

  handleCreate = async (name: string) => {
    const { actionCreateStage, selectedPipeline: { _id } } = this.props;
    actionCreateStage(_id, name)
  }

  handleUpdate = async (_id: string, name: string) => {
    const { actionUpdateStage } = this.props;
    actionUpdateStage(_id, name);
  };

  handleDelete = async (_id: string) => {
    const { selectedPipeline, actionRemoveStage } = this.props;
    actionRemoveStage(selectedPipeline._id, _id);
  };

  render(): React.ReactNode {
    const { anchorEl }= this.state;
    const { classes, selectedPipeline } = this.props;

    return (
      <div className={classes.root}>
       { selectedPipeline && selectedPipeline.stages && selectedPipeline.stages.length > 0?
        <>
          {selectedPipeline.stages.map((stage, index) =>
            <Board
              key={index}
              stage={stage}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
            />
          )}
          <Create onCreate={this.handleCreate} />
        </>:
          <div className={classes.emptyState}>
            <EmptyState
              title="Start a new stage"
              subTitle="Add more stages for the candidates to go through"
              ctaTitle="Create stage"
              onAction={this.open}
              icon={<ViewWeekIcon/>}
            />
            <UpdatePopover
              parentAnchorEl={anchorEl}
              onSave={this.handleCreate}
              onClose={this.close}
            />
          </div>
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
  },
  emptyState: {
    padding: theme.spacing.unit * 5,
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
    actionCreateStage: bindActionCreators(actionCreateStage, dispatch),
    actionUpdateStage: bindActionCreators(actionUpdateStage, dispatch),
    actionRemoveStage: bindActionCreators(actionRemoveStage, dispatch),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Stages));
