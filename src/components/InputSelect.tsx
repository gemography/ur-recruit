import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  TextField,
  MenuItem,
} from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  onSave?: (value: string) => void;
  options: Array<any>;
  value?: string;
  valueLabel: string;
  label: string;
  helperText: string;
}

class StageSelect extends React.Component<Props> {
  state = {
    value: this.props.value || ""
  }
  save = () => {
    const { onSave } = this.props;
    const { value } = this.state;
    !!value && onSave && onSave(value)
    this.setState({value: ""})
  };

  handleChange = (event: any) => {
    const { onSave } = this.props;
    onSave && onSave(event.target.value)
    this.setState({value: event.target.value})
  }

  render(): React.ReactNode {
    const { value } = this.state;
    const { classes, options, valueLabel, label, helperText } = this.props;

    return (
      <TextField
        id="outlined-select-currency"
        select
        label={label}
        value={value}
        onChange={this.handleChange}
        className={classes.menu}
        helperText={helperText}
        margin="normal"
        variant="outlined"
      >
        {options.map(option => (
          <MenuItem key={option._id} value={option._id}>
            {option[valueLabel]}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  textField: {
    margin: theme.spacing.unit
  },
  menu: {
    margin: theme.spacing.unit,
    width: 128
  }
});

export default withStyles(styles)(StageSelect);
