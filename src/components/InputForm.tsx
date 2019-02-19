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
  name?: string;
}

class CreateForm extends React.Component<Props> {
  state = {
    name: this.props.name || ""
  }
  save = () => {
    const { onSave } = this.props;
    const { name } = this.state;
    !!name && onSave(name)
    this.setState({name: ""})
  };

  handleChange = (event: any) => {
    this.setState({name: event.target.value})
  }

  render(): React.ReactNode {
    const { name } = this.state;
    const { classes } = this.props;

    return (
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
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            this.save()
            ev.preventDefault();
          }
        }}
      />
    );
  }
}

const styles = (theme: Theme) => createStyles({
  textField: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(CreateForm);
