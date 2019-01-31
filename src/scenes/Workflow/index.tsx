import * as React from 'react';
import OptionMenu from './components/OptionMenu'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import update from 'immutability-helper';

import EventDialog from './components/EventDialog';
import Option, { EventPlaceholder } from './components/OptionFlowchart/index';
import Api, { ApiModelEnum } from '../../services/Api';
import { WorkflowModel, OptionModel } from './model'
import { string } from 'prop-types';

interface Props extends WithStyles<typeof styles> {}

interface State {
  open: boolean;
  workflow: WorkflowModel;
  WorkflowApi: Api;
  event: string;
  children: Array<OptionModel>;
}

class Workflow extends React.Component<Props, State> {
  state = {
    open: false,
    workflow: {} as WorkflowModel,
    WorkflowApi: new Api(ApiModelEnum.workflow),
    event: "",
    children: [] as Array<OptionModel>
  };

  async componentDidMount() {
    this.handleWorkflowChange()
  }

  handleWorkflowChange = async () => {
    const { WorkflowApi } = this.state;
    try {
      const workflow = await WorkflowApi.fetch("5c5056c466a577184fb85e71") as WorkflowModel;
      this.setState({
        event: workflow.event,
        children: workflow.children
      });
    } catch(e) {
      console.log(e);
    }
  }

  handleOpenDialog = () => this.setState({ open: true });
  handleCloseDialog = () => this.setState({ open: false });

  render(): React.ReactNode {
    const { open,  event, children} = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <OptionMenu onWorkflowChange={this.handleWorkflowChange}></OptionMenu>
        <main className={classes.main}>
          <EventDialog
            open={open}
            onClose={this.handleCloseDialog}
          />
          {
            !event?
              <EventPlaceholder onClick={this.handleOpenDialog}>Add an Event</EventPlaceholder>:
              <Option
                id={event}
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

export default withStyles(styles)(Workflow);
