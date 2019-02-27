import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from '@material-ui/core';
import EmptyState from '../../components/EmptyState';
import MergeTypeIcon from '@material-ui/icons/MergeType';

interface Props extends WithStyles<typeof styles> {}
class Welcome extends React.Component<Props> {
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <EmptyState
          title="Start a new pipeline"
          subTitle="Add more automation to your hiring process"
          ctaTitle="Create pipeline"
          onAction={() => console.log("Action")}
          icon={<MergeTypeIcon/>}
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

export default withStyles(styles)(Welcome);
