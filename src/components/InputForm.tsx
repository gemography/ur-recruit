import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  IconButton,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

interface Props extends WithStyles<typeof styles> {
  onSave: (value: string) => void;
  value?: string;
}

class CreateForm extends React.Component<Props> {
  state = {
    value: this.props.value || ""
  }
  save = () => {
    const { onSave } = this.props;
    const { value } = this.state;
    !!value && onSave(value)
    this.setState({value: ""})
  };

  handleChange = (event: any) => {
    this.setState({value: event.target.value})
  }

  render(): React.ReactNode {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <TextField
        id="outlined-adornment-save"
        variant="outlined"
        className={classes.textField}
        label="What's new?"
        value={value}
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
