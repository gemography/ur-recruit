import * as React from 'react';
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
  Drawer,
} from '@material-ui/core';

import {
  actionFetchPipelines,
  actionSelectPipeline,
  actionCreatePipeline,
  actionUpdatePipeline,
  actionRemovePipeline,
} from './actions';

import { PipelineModel } from './models'
import CreateForm from '../../components/CreateForm';
import ATSListItem from '../../components/ATSListItem';

interface Props extends WithStyles<typeof styles> {
  pipelines: Array<PipelineModel>;
  selectedId: string,
  actionFetchPipelines: any,
  actionSelectPipeline: any,
  actionCreatePipeline: any,
  actionUpdatePipeline: any,
  actionRemovePipeline: any,
}

class Pipelines extends React.Component<Props> {
  componentDidMount() {
    const { selectedId, actionFetchPipelines } = this.props;
    actionFetchPipelines(selectedId);
  };

  handleSelect = (selectedPipeline: PipelineModel) => {
    const { actionSelectPipeline } = this.props;
    actionSelectPipeline(selectedPipeline);
  };

  handleCreate = async (name: string) => {
    const { actionCreatePipeline } = this.props;
    actionCreatePipeline(name);
  };

  handleUpdate = async (_id: string, name: string) => {
    const { actionUpdatePipeline } = this.props;
    actionUpdatePipeline(_id, name);
  };

  handleDelete = async (_id: string) => {
    const { actionRemovePipeline } = this.props;
    actionRemovePipeline(_id);
  };

  render(): React.ReactNode {
    const { pipelines, classes, selectedId } = this.props;

    return (
      pipelines.length > 0 ?
        <nav className={classes.drawer}>
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
          >
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
          </Drawer>
        </nav>:
        <div className={classes.empty}></div>
    );
  }
}

const drawerWidth = 320;
const styles = (theme: Theme) => createStyles({
  appName: {
    padding: theme.spacing.unit * 2,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  empty: {
    margin: 128
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
    actionSelectPipeline: bindActionCreators(actionSelectPipeline, dispatch),
    actionCreatePipeline: bindActionCreators(actionCreatePipeline, dispatch),
    actionUpdatePipeline: bindActionCreators(actionUpdatePipeline, dispatch),
    actionRemovePipeline: bindActionCreators(actionRemovePipeline, dispatch),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Pipelines));
