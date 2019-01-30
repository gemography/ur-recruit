import * as React from 'react';
import { Grid } from '@material-ui/core';

import Line from './Line';
import Action from './Action';
import { OptionModel} from '../../model'

interface Props {
  id: string,
  children: Array<OptionModel>
}

interface State {
  item: OptionModel
}


class Option extends React.Component<Props, State> {
  state = {
    item: {} as OptionModel
  }

  componentDidMount() {
    const { id, children = []} = this.props;
    const item = children.filter(item=> item._id === id)[0]
    this.setState({ item })
  }

  render() {
    const { item } = this.state;
    const { children } = this.props;
    return (
      <>
        <Action>{item.type}</Action>
        <Line/>
        <Grid container spacing={40}>
          {
            item.children && item.children.map((child, index) =>
              <Grid key={index} item>
                <Option
                  key={index}
                  id={child}
                  children={children}
                ></Option>
              </Grid>
            )
          }
        </Grid>
      </>
    );
  }
}

export default Option;
