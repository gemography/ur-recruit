import * as React from 'react';
import { Link } from 'react-router-dom'
import OptionMenu from '../components/OptionMenu'
import { createStyles, WithStyles, withStyles, Theme, IconButton } from '@material-ui/core';

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionFetchWorkflow } from '../actions'

import Option from '../components/OptionFlowchart/index';
import { WorkflowModel } from '../models'
import {Placeholder} from '../components/OptionFlowchart';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface Props extends WithStyles<typeof styles> {
  workflow: WorkflowModel;
  workflowId: string;
  actionFetchWorkflow: any;
}

class Workflow extends React.Component<Props> {
  static defaultProps = {
    workflow: {} as WorkflowModel
  };

  fetchWorkflow(){
    const { actionFetchWorkflow, workflowId} = this.props;
    actionFetchWorkflow(workflowId);
  }

  componentDidMount() {
    this.fetchWorkflow();
  }

  componentDidUpdate() {
    const { workflow, workflowId} = this.props;
    if (workflow._id && workflow._id !== workflowId) {
      this.fetchWorkflow();
    }
  }

  render(): React.ReactNode {
    const { classes, workflow: {name, event, children}, workflowId } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.body}>
          <OptionMenu eventExists={!!event} workflowId={workflowId}></OptionMenu>
          <main className={classes.main}>
            {
              !event?
                <Placeholder parent="" />:
                <Option
                  workflowId={workflowId}
                  item={children.filter(item=> item._id === event)[0]}
                  children={children}
                />
            }
          </main>
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: { },
  body: {
    display: "flex",
  },
  main: {
    width: 600,
    paddingTop: theme.spacing.unit * 5,
    textAlign: "center"
  }
});


function mapStateToProps(state: any) {
  const { workflow } = state.workflowsReducer

  return {
    workflow
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actionFetchWorkflow: bindActionCreators(actionFetchWorkflow, dispatch)
  };
}

export default withStyles(styles)(
  DragDropContext(HTML5Backend)(
    connect(mapStateToProps, mapDispatchToProps)(Workflow)));
