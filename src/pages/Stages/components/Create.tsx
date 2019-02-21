import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  Button,
} from '@material-ui/core';
import UpdatePopover from '../../../components/UpdatePopover';
import AddIcon from '@material-ui/icons/Add';

interface Props extends WithStyles<typeof styles> {
  onCreate: (name: string) => void;
}

class CreateForm extends React.Component<Props> {
  state = {
    anchorEl: null
  }

  open = (event: any) => this.setState({anchorEl: event.currentTarget})
  close = () => this.setState({anchorEl: null})

  handleSave = (name: string) => {
    const { onCreate } = this.props;
    !!name && onCreate(name)
    this.setState({anchorEl: null})
  };

  render(): React.ReactNode {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);

    return (
      <>
        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          aria-label="AddStage"
          className={classes.button}
          onClick={this.open}
        >
          <AddIcon />
          Add a Stage
        </Button>

        <UpdatePopover
          parentAnchorEl={anchorEl}
          onSave={this.handleSave}
          onClose={this.close}
        />
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  button: {
    height: theme.spacing.unit * 5,
    color: theme.palette.primary.light,
    padding: `0 ${theme.spacing.unit}px`,
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    width: 256,
  }
});

export default withStyles(styles)(CreateForm);
