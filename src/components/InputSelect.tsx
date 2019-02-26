import * as React from 'react';
import { connect } from 'react-redux';
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
    const { classes, options, valueLabel } = this.props;

    return (
      <TextField
        id="outlined-select-currency"
        select
        label="OptionSelect"
        value={value}
        onChange={this.handleChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Select the stage"
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
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(StageSelect);
