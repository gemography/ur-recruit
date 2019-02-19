import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  ListItem,
  ListItemText,
  IconButton,
  List,
  ListSubheader,
} from '@material-ui/core';

import { actionFetchPipelines, actionSelectPipeline } from './actions'
import { PipelineModel } from './models'
import AddIcon from '@material-ui/icons/Add';

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

  render(): React.ReactNode {
    const { pipelines, classes, pipelineId } = this.props;

    return (
      <div>
        <div className={classes.toolbar}></div>
        <List
          subheader={
            <ListSubheader component="div">
              Create a pipeline
              <IconButton aria-label="AddPipeline" className={classes.addIcon}>
                <AddIcon fontSize="small" />
              </IconButton>
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
  toolbar: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 6
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  link: {
    textDecoration: "none"
  },
  addIcon: {
    position: "absolute",
    right: 8,
    top: 2,
    cursor: "pointer"
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
