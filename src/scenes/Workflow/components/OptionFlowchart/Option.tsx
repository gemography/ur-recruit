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
  constructor(props: Props) {
    super(props);
    const { id, children = []} = this.props;
    this.state = { item: children.filter(item=> item._id === id)[0] };
  }

  componentDidUpdate(prevProps: Props) {
    const { id, children = []} = this.props;
    if (children.length !== prevProps.children.length) {
      this.setState({ item: children.filter(item=> item._id === id)[0] });
    }
  }

  render() {
    const { item } = this.state;
    const { children } = this.props;
    const childrenSize = (item && item.children)? item.children.length : 0;

    return (
      <>
      {
        item &&
          <>
            <Item type={item.type} text={item._id} />
            <Grid container spacing={40} justify="center">
              {
                <>
                  { childrenSize > 1 && <Curve/> }
                  { childrenSize > 0?
                    item.children.map((child, index) =>
                      <Grid key={index} item>
                        <Line/>
                        <Option
                          key={index}
                          id={child}
                          children={children}
                        ></Option>
                      </Grid>
                    ):
                    <Grid item>
                      <Line/>
                      <Placeholder parent={item._id} />
                    </Grid>
                  }
                </>
              }
            </Grid>
          </>
      }
      </>
    );
  }
}

export default Option;
