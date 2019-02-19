import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  IconButton,
  Popover,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

interface Props extends WithStyles<typeof styles> {
  onSave: (name: string) => void;
}

class CreateForm extends React.Component<Props> {
  state = {
    name: "",
    anchorEl: null,
  }

  open = (event: any) => this.setState({anchorEl: event.currentTarget})
  close = () => this.setState({anchorEl: null, name: ""})

  save = () => {
    const { onSave } = this.props;
    const { name } = this.state;
    !!name && onSave(name)
    this.setState({anchorEl: null, name: ""})
  };

  handleChange = (event: any) => {
    this.setState({name: event.target.value})
  }

  render(): React.ReactNode {
    const { anchorEl, name } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <>
        <IconButton
         aria-owns={open ? 'simple-popper' : undefined}
         aria-haspopup="true"
         aria-label="AddPipeline"
         className={classes.addIcon}
         onClick={this.open}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        <Popover
          id="create-form-popover"
          anchorEl={anchorEl}
          open={open}
          onClose={this.close}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
        <TextField
          id="outlined-adornment-save"
          variant="outlined"
          className={classes.textField}
          label="What's the name?"
          value={name}
          onChange={this.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Toggle password visibility" onClick={this.save}>
                  <SaveIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Popover>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  toolbar: theme.mixins.toolbar,
  save: {
    cursor: "pointer"
  },
  textField: {
    margin: theme.spacing.unit
  },
  addIcon: {
    position: "absolute",
    right: 8,
    top: 2,
    cursor: "pointer"
  }
});

export default withStyles(styles)(CreateForm);
