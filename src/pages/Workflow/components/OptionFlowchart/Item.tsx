import * as React from 'react';
import axios from 'axios';
import classnames from 'classnames'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import Api from '../../../../services/Api';

import { Action, Event, Condition} from './index';
import { OptionModel } from '../../model'

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionFetchWorkflow } from '../../actions'

interface Props extends WithStyles<typeof styles> {
  item: OptionModel;
  isDragging?: boolean;
  actionFetchWorkflow: any;
  isDestroy?: boolean
  isEdit?: boolean
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Item extends React.Component<Props> {

  handleDestroy = async () => {
    const { item, actionFetchWorkflow } = this.props;
    await axios.delete(`${Api.baseUrl}/workflows/${Api.testWorkflow}/options/${item._id}`);
    actionFetchWorkflow();
  }

  handleUpdate = async (value: string) => {
    const { item, actionFetchWorkflow } = this.props;
    await axios.put(`${Api.baseUrl}/workflows/${Api.testWorkflow}/options/${item._id}`, { value });
    actionFetchWorkflow();
  }

  getSpecificItem(item: OptionModel) {
    const types: ItemTypes = {
      EVENT: <Event item={item} />,
      ACTION: <Action onUpdate={this.handleUpdate} item={item} />,
      CONDITION: <Condition onUpdate={this.handleUpdate} item={item} />
    };
    return types;
  }

  render() {
    const { item, isDragging, isDestroy, classes } = this.props;

    return (
      <div className={classes.root}>
        {isDestroy && <CancelOutlinedIcon onClick={this.handleDestroy} className={classes.cancel}></CancelOutlinedIcon>}
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
  cancel: {
    position: "absolute",
    right: -theme.spacing.unit,
    top: -theme.spacing.unit,
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
