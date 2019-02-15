import * as React from 'react';
import OptionMenu from '../components/OptionMenu'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionFetchWorkflow } from '../actions'

import Option from '../components/OptionFlowchart/index';
import { WorkflowModel } from '../model'
import {Placeholder} from '../components/OptionFlowchart';

interface Props extends WithStyles<typeof styles> {
  workflow: WorkflowModel;
  actionFetchWorkflow: any;
  match: any
}

class Workflow extends React.Component<Props> {
  static defaultProps = {
    workflow: {} as WorkflowModel
  };

  componentDidMount() {
    const { actionFetchWorkflow, match: { params: { id }}} = this.props;
    actionFetchWorkflow(id);
  }

  render(): React.ReactNode {
    const { classes, workflow: {event, children}, match: { params: { id }} } = this.props;

    return (
      <div className={classes.root}>
        <OptionMenu eventExists={!!event} workflowId={id}></OptionMenu>
        <main className={classes.main}>
          {
            !event?
              <Placeholder parent="" />:
              <Option
                workflowId={id}
                item={children.filter(item=> item._id === event)[0]}
                children={children}
              />
          }
        </main>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex"
  },
  main: {
    width: 600,
    margin: theme.spacing.unit * 10,
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
