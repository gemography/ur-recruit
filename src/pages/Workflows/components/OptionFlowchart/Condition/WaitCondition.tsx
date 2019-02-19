import * as React from 'react';
import { Typography, Button, TextField, InputAdornment } from '@material-ui/core';
import { OptionModel } from '../../../models';

interface Props {
  item: OptionModel;
  onUpdate: (value: string) => void;
}

class WaitCondition extends React.Component<Props> {
  state = {
    isForm: !!this.props.item._id,
    value: this.props.item.value,
    isEdit: false,
  }

  edit = () => { this.setState({ isEdit: true }); };
  save = () => {
    const { value } = this.state;
    const { onUpdate } = this.props;
    this.setState({ isEdit: false });
    onUpdate(value)
  };
  handleChange = (event: any) => { this.setState({ value: event.target.value }); };

  render() {
    const { value, isEdit, isForm } = this.state;

    return (
      <>
        <Typography variant="subtitle2" color="primary">{`Go to the next step ${value || "in ..."}`}</Typography>
        { isForm &&
            <>
              {!isEdit?
                <Button onClick={this.edit}>Update</Button>:
                <>
                  <TextField
                    id="standard-name"
                    placeholder="In 3 minutes"
                    label="Name"
                    value={value}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <Button onClick={this.save}>Save</Button>
                </>
              }
            </>
        }
      </>
    );
  }
}

export default WaitCondition;
