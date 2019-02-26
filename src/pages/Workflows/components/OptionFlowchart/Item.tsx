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
  isDestroy?: boolean;
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
    const types: ItemTypes = {
      EVENT: <Event item={item} />,
      ACTION: <Action item={item} />,
      CONDITION: <Condition item={item} />
    };
    return types;
  }

  render() {
    const { item, isDragging, isDestroy, classes } = this.props;
    const nonEditableOptions = ["WEBHOOK"];

    return (
      <div className={classes.root}>
        {isDestroy &&
          <div className={classes.setting}>
            {!nonEditableOptions.includes(item.method)?
              <Setting
                data={item}
                onUpdate={this.handleUpdate}
                onDelete={this.handleDestroy}
              />:
              <Setting
                data={item}
                onDelete={this.handleDestroy}
              />}
          </div>
        }
        <div className={classnames({[classes.dragging]: isDragging})}>
          { this.getSpecificItem(item)[item.type] }
        </div>
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
  setting: {
    position: "absolute",
    right: -theme.spacing.unit,
    top: -theme.spacing.unit,
    backgroundColor: theme.palette.common.white,
    boxShadow: `0 1px 3px ${theme.palette.primary.light}`,
    borderRadius: 2 * theme.spacing.unit,
    cursor: "pointer",
    visibility: 'hidden'
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
