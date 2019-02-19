import * as React from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { OptionModel } from '../../../models';

interface Props {
  item: OptionModel
  onUpdate: (value: string) => void
}

interface State {
  value: string,
  isEdit: boolean,
}

class TagAction extends React.Component<Props, State> {
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
        <Typography variant="subtitle2" color="primary">{`Tag the candidate as ${value || "..."}`}</Typography>
        { isForm &&
            <>
              {!isEdit?
                <Button onClick={this.edit}>Update</Button>:
                <>
                  <TextField
                    id="standard-name"
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

export default TagAction;
