import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import { OptionModel } from '../../../models';

import EmailAction from './EmailAction';
import DisqualifyAction from './DisqualifyAction';
import StageAction from './StageAction';
import TagAction from './TagAction';

interface Props extends WithStyles<typeof styles> {
  item: OptionModel;
  onUpdate: (value: string) => void
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Action extends React.Component<Props> {
  getSpecificAction(item: OptionModel) {
    const { onUpdate } = this.props;

    const types: ItemTypes = {
      EMAIL: <EmailAction />,
      DISQUALIFY: <DisqualifyAction />,
      STAGE: <StageAction item={item} />,
      TAG: <TagAction onUpdate={onUpdate} item={item} />,
    };
    return types;
  }

  render() {
    const { item, classes } = this.props;
    return (
      <div className={classes.root}>
        { this.getSpecificAction(item)[item.method] }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.common.white,
    border: "2px solid " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit * 5,
    width: 256,
    margin: "0 auto"
  }
});

export default withStyles(styles)(Action);
