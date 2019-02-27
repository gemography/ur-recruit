import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from '@material-ui/core';
import {
  actionCreatePipeline,
} from '../Pipelines/actions';
import EmptyState from '../../components/EmptyState';
import UpdatePopover from '../../components/UpdatePopover';
import MergeTypeIcon from '@material-ui/icons/MergeType';

interface Props extends WithStyles<typeof styles> {
  actionCreatePipeline: any
}

class Welcome extends React.Component<Props> {
  state = {
    anchorEl: null
  }

  open = (event: any) => this.setState({anchorEl: event.currentTarget});
  close = () => this.setState({anchorEl: null});

  handleCreate = async (name: string) => {
    const { actionCreatePipeline } = this.props;
    actionCreatePipeline(name);
  };

  render(): React.ReactNode {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <EmptyState
          title="Start a new pipeline"
          subTitle="Add more automation to your hiring process"
          ctaTitle="Create pipeline"
          onAction={this.open}
          icon={<MergeTypeIcon/>}
        />
        <UpdatePopover
          parentAnchorEl={anchorEl}
          onSave={this.handleCreate}
          onClose={this.close}
        />
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    margin: theme.spacing.unit * 4,
    marginTop: 0
  }
});

function mapDispatchToProps(dispatch: any) {
  return {
    actionCreatePipeline: bindActionCreators(actionCreatePipeline, dispatch),
  };
}

export default withStyles(styles)(connect(undefined, mapDispatchToProps)(Welcome));
