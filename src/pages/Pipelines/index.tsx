import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  List,
  ListSubheader,
  Typography,
} from '@material-ui/core';

import Api from '../../services/Api';
import { actionFetchPipelines, actionSelectPipeline } from './actions'
import { PipelineModel } from './models'
import CreateForm from '../../components/CreateForm';
import ATSListItem from '../../components/ATSListItem';

interface Props extends WithStyles<typeof styles> {
  pipelines: Array<PipelineModel>;
  selectedId: string,
  actionFetchPipelines: any,
  actionSelectPipeline: any,
}

class Pipelines extends React.Component<Props> {
  componentDidMount() {
    const { selectedId } = this.props;
    this.refresh(selectedId)
  };

  refresh = (selectedId: string) => {
    const { actionFetchPipelines } = this.props;
    actionFetchPipelines(selectedId);
  }

  handleCreate = async (name: string) => {
    const {data: {pipeline: {_id}} } = await axios.post(`${Api.baseUrl}/pipelines`, { name });
    this.refresh(_id);
  };

  handleUpdate = async (_id: string, name: string) => {
    await axios.put(`${Api.baseUrl}/pipelines/${_id}`, { name });
    this.refresh(_id);
  };

  handleDelete = async (_id: string) => {
    const { pipelines } = this.props;
    await axios.delete(`${Api.baseUrl}/pipelines/${_id}`);
    this.refresh(pipelines.filter(pipeline=> pipeline._id !== _id)[0]._id);
  };

  handleSelect = (selectedPipeline: PipelineModel) => {
    const { actionSelectPipeline } = this.props;
    actionSelectPipeline(selectedPipeline);
  };

  render(): React.ReactNode {
    const { pipelines, classes, selectedId } = this.props;

    return (
      <div>
        <div className={classes.appName}>
          <Typography color="primary" variant="h5">ATS MVP</Typography>
        </div>
        <List
          subheader={
            <ListSubheader component="div">
              Pipelines
              <CreateForm onSave={this.handleCreate}/>
            </ListSubheader>
          }
        >
        {
          pipelines.map((pipeline, index) =>
            <ATSListItem
              key={index}
              data={pipeline}
              isSelected={pipeline._id === selectedId}
              onSelect={() => this.handleSelect(pipeline)}
              onCreate={this.handleCreate}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
            />
          )
        }
        </List>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  appName: {
    padding: theme.spacing.unit * 2,
  }
});

function mapStateToProps(state: any) {
  const { pipelines } = state.pipelineReducer

  return {
    pipelines
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actionFetchPipelines: bindActionCreators(actionFetchPipelines, dispatch),
    actionSelectPipeline: bindActionCreators(actionSelectPipeline, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Pipelines));
