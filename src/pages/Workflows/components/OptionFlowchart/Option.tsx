import * as React from 'react';
import { Grid } from '@material-ui/core';

import { OptionModel } from '../../models';
import {Placeholder, Line, Curve, Item} from './index';
import { ConditionMethodEnum } from '../../lib/commands/ConditionCommand'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCirclelIcon from '@material-ui/icons/CheckCircle';

interface Props {
  item: OptionModel;
  children: Array<OptionModel>;
  workflowId: string;
}

class Option extends React.Component<Props> {

  render() {
    const { children = [] as Array<OptionModel>, item, workflowId } = this.props;
    const childrenSize = (item && item.children)? item.children.length : 0;
    const isIfElseMethod = ConditionMethodEnum[item.method as ConditionMethodEnum] === ConditionMethodEnum.IF_ELSE;

    return (
      <>
      {
        item &&
          <>
            <Item item={item} workflowId={workflowId} isForm />
            <Grid container spacing={40} justify="center">
              {
                childrenSize > 0?
                <>
                  { isIfElseMethod  && <Curve/> }
                  {
                    item.children.map((child, index) =>
                      <Grid key={index} item>
                        {isIfElseMethod && index < 1 && <CheckCirclelIcon></CheckCirclelIcon>}
                        {isIfElseMethod && index >= 1 && <CancelIcon></CancelIcon>}
                        <Line/>
                        <Option
                          item={children.filter(item => item._id === child)[0]}
                          workflowId={workflowId}
                          children={children}
                        ></Option>
                      </Grid>
                    )
                  }
                  { isIfElseMethod && childrenSize < 2 &&
                    <Grid item>
                      <CancelIcon></CancelIcon>
                      <Line/>
                      <Placeholder parent={item._id} />
                    </Grid>
                  }
                </>:
                <>
                  <Grid item>
                    <Line/>
                    <Placeholder parent={item._id} />
                  </Grid>
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
