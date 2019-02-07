import * as React from 'react';
import axios from 'axios';
import classnames from 'classnames'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import Api from '../../../../services/Api';

import { Action, Event, Condition} from './index';
import { CommandTypeEnum } from '../../lib/Command'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionFetchWorkflow } from '../../actions'

interface Props extends WithStyles<typeof styles> {
  id?: string
  type: CommandTypeEnum
  text: string
  isDragging?: boolean
  actionFetchWorkflow: any;
  isDestroy?: boolean
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Item extends React.Component<Props> {

  handleDestroy = async () => {
    const { id ="", actionFetchWorkflow } = this.props;
    await axios.delete(`${Api.baseUrl}/workflows/${Api.testWorkflow}/options/${id}`);
    actionFetchWorkflow()
  }

  getSpecificItem(text: string) {
    const types: ItemTypes = {
      EVENT: <Event>{text}</Event>,
      ACTION: <Action>{text}</Action>,
      CONDITION: <Condition>{text}</Condition>
    };
    return types;
  }

  render() {
    const { type, text, isDragging, isDestroy, classes } = this.props;

    return (
      <div className={classes.root}>
        {isDestroy && <CancelOutlinedIcon onClick={this.handleDestroy} className={classes.cancel}></CancelOutlinedIcon>}
        <div className={classnames({[classes.dragging]: isDragging})}>
          { this.getSpecificItem(text)[type] }
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
