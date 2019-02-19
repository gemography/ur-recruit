import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  ListItem,
  ListItemText,
  List,
  ListSubheader,
  Typography,
} from '@material-ui/core';

import Api from '../../services/Api';
import { actionFetchPipelines, actionSelectPipeline } from './actions'
import { PipelineModel } from './models'
import CreateForm from '../../components/CreateForm';

interface Props extends WithStyles<typeof styles> {
  pipelines: Array<PipelineModel>;
  pipelineId: string,
  actionFetchPipelines: any,
  actionSelectPipeline: any,
}

class Pipelines extends React.Component<Props> {
  componentDidMount() {
    const { actionFetchPipelines, pipelineId } = this.props;
    actionFetchPipelines(pipelineId);
  };

  handlePipelineSelect = (selectedPipeline: PipelineModel) => {
    const { actionSelectPipeline } = this.props;
    actionSelectPipeline(selectedPipeline);
  }

  handlePipelineCreate = async (name: string) => {
    const { actionFetchPipelines } = this.props;
    const {data: {pipeline} } = await axios.post(`${Api.baseUrl}/pipelines`, { name })
    actionFetchPipelines(pipeline._id);
  }

  render(): React.ReactNode {
    const { pipelines, classes, pipelineId } = this.props;

    return (
      <div>
        <div className={classes.appName}>
          <Typography color="primary" variant="h5">ATS MVP</Typography>
        </div>
        <List
          subheader={
            <ListSubheader component="div">
              Pipelines
              <CreateForm onSave={this.handlePipelineCreate}/>
            </ListSubheader>
          }
        >
        {
          pipelines.map((pipeline, index) =>
            <ListItem button selected={pipeline._id === pipelineId} key={index} onClick={() => this.handlePipelineSelect(pipeline)}>
              <ListItemText primary={pipeline.name} />
            </ListItem>
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
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  link: {
    textDecoration: "none"
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
