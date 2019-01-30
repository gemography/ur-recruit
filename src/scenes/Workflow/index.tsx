import * as React from 'react';
import OptionMenu from './components/OptionMenu'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import EventDialog from './components/EventDialog';
import { Action, Event, EventPlaceholder } from './components/OptionFlowchart/index';
import Api, { ApiModelEnum } from '../../services/Api';
import { WorkflowModel} from './model'

interface Props extends WithStyles<typeof styles> {}

interface State {
  open: boolean;
  workflow: WorkflowModel;
  WorkflowApi: Api;
}

class Workflow extends React.Component<Props, State> {
  state = {
    open: false,
    workflow: {} as WorkflowModel,
    WorkflowApi: new Api(ApiModelEnum.workflow)
  };

  async componentDidMount() {
    const {WorkflowApi} = this.state;
    try {
      const workflow = await WorkflowApi.fetch("5c5056c466a577184fb85e71");
      this.setState({ workflow: workflow as WorkflowModel });
    } catch(e) {
      console.log(e);
    }
  }

  handleOpenDialog = () => this.setState({ open: true });
  handleCloseDialog = () => this.setState({ open: false });

  render(): React.ReactNode {
    const { open,  workflow} = this.state;
    const { classes } = this.props;

    return (
      <div>
        <OptionMenu></OptionMenu>
        <main className={classes.main}>
          <EventDialog
            open={open}
            onClose={this.handleCloseDialog}
          />
          {
            !(workflow && workflow.event)
            ? <EventPlaceholder onClick={this.handleOpenDialog}>Add an Event</EventPlaceholder>
            : <Event>action 1</Event>
          }
          {workflow && workflow.children && workflow.children.map((item, index) => (
            <Action key={index}>{item.type}</Action>
          ))}
        </main>
      </div>
    );
  }
}


const styles = (theme: Theme) => createStyles({
  main: {
    width: 320,
    margin: "32px auto",
    textAlign: "center"
  },
  eventPlaceHolder: {
    border: "2px dashed " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit * 5
  }
});

export default withStyles(styles)(Workflow);
