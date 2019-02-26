import * as React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionFetchWorkflow } from '../../actions'
import { OptionModel } from '../../models';

import Api from '../../../../services/Api';

import { Action, Event, Condition, Setting } from './index';


interface Props extends WithStyles<typeof styles> {
  item: OptionModel;
  isDragging?: boolean;
  actionFetchWorkflow: any;
  isForm?: boolean;
  workflowId?: string;
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Item extends React.Component<Props> {

  handleDestroy = async (_id: string) => {
    const { actionFetchWorkflow, workflowId } = this.props;
    await axios.delete(`${Api.baseUrl}/workflows/${workflowId}/options/${_id}`);
    actionFetchWorkflow(workflowId);
  }

  handleUpdate = async (_id: string, value: string) => {
    const { actionFetchWorkflow, workflowId } = this.props;
    await axios.put(`${Api.baseUrl}/workflows/${workflowId}/options/${_id}`, { value });
    actionFetchWorkflow(workflowId);
  }

  getSpecificItem(item: OptionModel) {
    const { isForm } = this.props;
    const types: ItemTypes = {
      EVENT: <Event item={item} isForm={isForm} onDestroy={this.handleDestroy} onUpdate={this.handleUpdate} />,
      ACTION: <Action item={item} isForm={isForm} onDestroy={this.handleDestroy} onUpdate={this.handleUpdate} />,
      CONDITION: <Condition item={item} isForm={isForm} onDestroy={this.handleDestroy} onUpdate={this.handleUpdate} />
    };
    return types;
  }

  render() {
    const { item, isDragging, classes } = this.props;

    return (
      <div className={classnames({[classes.root]: true, [classes.dragging]: isDragging})}>
        { this.getSpecificItem(item)[item.type] }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: "relative",
    width: "fit-content",
    margin: "0 auto",
    "&:hover": {
      '& *': {
        visibility: 'inherit',
      },
    }
  },
  dragging: {
    opacity: 0.4
  }
});

function mapDispatchToProps(dispatch: any) {
  return {
    actionFetchWorkflow: bindActionCreators(actionFetchWorkflow, dispatch)
  };
}

export default withStyles(styles)(connect(undefined, mapDispatchToProps)(Item));
