import * as React from 'react';
import { Typography, Button } from '@material-ui/core';
import { OptionModel } from '../../../models';
import InputSelect from '../../../../../components/InputSelect'
import { Setting } from '../index'

interface Props {
  item: OptionModel;
  isForm?: boolean;
  onUpdate: (_id: string, value: string) => void;
  onDestroy: (_id: string) => void;
}

class WaitCondition extends React.Component<Props> {
  state = {
    unit: "",
    time: ""
  }

  constructor(props: Props){
    super(props);
    const value = (this.props.item.value !== undefined)? this.props.item.value.split(" ") : [];
    const unit = value[1]? value[1] : "";
    const time = value[2]? value[2] : "";
    this.state = { unit, time };
  }

  handleUnitChange = (unit: string) => {
    this.setState({unit})
  }

  handleTimeChange = (time: string) => {
    this.setState({time})
  }

  handleSave = () => {
    const { unit, time } = this.state;
    const { item, onUpdate } = this.props;
    const value = `in ${unit} ${time}`
    onUpdate(item._id, value)
  }

  render() {
    const { item, isForm, onUpdate, onDestroy } = this.props;
    const { unit, time } = this.state;
    const units = [
      {_id: "5", value: "5"},
      {_id: "10", value: "10"},
      {_id: "20", value: "20"},
      {_id: "30", value: "30"}
    ];
    const times = [
      {_id: "minutes", value: "minutes"},
      {_id: "hours", value: "hours"},
      {_id: "days", value: "days"},
    ];

    return (
      <>
        {isForm &&
          <Setting
            data={item}
            onUpdate={onUpdate}
            onDelete={onDestroy}
            updateForm={
              <>
                <Typography variant="subtitle2" color="primary" align="center">In</Typography>
                <InputSelect
                  value={unit}
                  options={units}
                  valueLabel="value"
                  label="period of time"
                  helperText="5, 10, 15, ..."
                  onSave={this.handleUnitChange}
                />
                <InputSelect
                  value={time}
                  options={times}
                  valueLabel="value"
                  label="period of unit"
                  helperText="minutes, days, ..."
                  onSave={this.handleTimeChange}
                />
                <Typography variant="subtitle2" color="primary" align="center">
                  <Button onClick={this.handleSave}>Save</Button>
                </Typography>
              </>
            }
          />
        }
        <Typography variant="subtitle2" color="primary" align="center">Go to the next step</Typography>
        <Typography variant="subtitle1" color="primary" align="center">{`
          ${item.value || "in ..."}
        `}</Typography>
      </>
    );
  }
}

export default WaitCondition;
