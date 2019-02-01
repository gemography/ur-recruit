import * as React from 'react';
import { Grid } from '@material-ui/core';

import { OptionModel } from '../../model'
import {Placeholder, Line, Curve, Item} from './index';
import Api, { ApiModelEnum } from '../../../../services/Api';

interface Props {
  item: OptionModel,
  onWorkflowChange: () => void
  children: Array<OptionModel>
}

class Option extends React.Component<Props> {

   handleOptionDestroy = async () => {
    const { onWorkflowChange, item } = this.props;
    await new Api(ApiModelEnum.option).destroy(item._id)
    onWorkflowChange()
  }

  render() {
    const { children = [] as Array<OptionModel>, onWorkflowChange, item } = this.props;
    const childrenSize = (item && item.children)? item.children.length : 0;

    return (
      <>
      {
        item &&
          <>
            <Item type={item.type} text={item._id} onDestroy={this.handleOptionDestroy} />
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
                          item={children.filter(item => item._id === child)[0]}
                          children={children}
                          onWorkflowChange={onWorkflowChange}
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
