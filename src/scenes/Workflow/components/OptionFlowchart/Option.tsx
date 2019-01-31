import * as React from 'react';
import { Grid } from '@material-ui/core';

import { OptionModel } from '../../model'
import {Placeholder, Line, Curve, Item} from './index';

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
    const childrenSize = (item.children)? item.children.length : 0;

    return (
      <>
        <Item type={item.type} text={item._id} />
        <Grid container spacing={40} justify="center">
          {
            <>
              { childrenSize > 1 && <Curve/> }
              { item.children && item.children.map((child, index) =>
                  <Grid key={index} item>
                    { childrenSize <= 1 && <Line/> }
                    <Placeholder parent={item._id} />
                    <Line/>
                    <Option
                      key={index}
                      id={child}
                      children={children}
                    ></Option>
                  </Grid>
                )
              }
            </>
          }
        </Grid>
      </>
    );
  }
}

export default Option;
