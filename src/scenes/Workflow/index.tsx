import * as React from 'react';
import OptionMenu from './components/OptionMenu'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import EventDialog from './components/EventDialog';
import Option, { EventPlaceholder } from './components/OptionFlowchart/index';
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
    const event = (workflow.children)?
      workflow.children.filter(item=> item._id === workflow.event)[0]:
      null;

    return (
      <div>
        <OptionMenu></OptionMenu>
        <main className={classes.main}>
          <EventDialog
            open={open}
            onClose={this.handleCloseDialog}
          />
          {
            !event?
              <EventPlaceholder onClick={this.handleOpenDialog}>Add an Event</EventPlaceholder>:
              <Option
                id={workflow.event}
                children={workflow.children}
              />
          }
        </main>
      </div>
    );
  }
}


const styles = (theme: Theme) => createStyles({
  main: {
    width: 600,
    margin: "32px auto",
    textAlign: "center"
  }
});

export default withStyles(styles)(Workflow);
