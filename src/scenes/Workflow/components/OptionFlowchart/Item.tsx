import * as React from 'react';

import { Action, Event, Condition} from './index';
import { OptionModel} from '../../model';

interface Props {
  item: OptionModel
}

interface ItemTypes {
  [key:string]:   React.ReactElement<any>;
}

class Item extends React.Component<Props> {
  getSpecificItem(item: OptionModel) {
    const types: ItemTypes = {
      EVENT: <Event>{item.method}</Event>,
      ACTION: <Action>{item.method}</Action>,
      CONDITION: <Condition>{item.method}</Condition>
    };
    return types;
  }

  render() {
    const { item } = this.props;

    return (
      <> { this.getSpecificItem(item)[item.type] } </>
    );
  }
}

export default Item;
