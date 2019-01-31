import * as React from 'react';
import { CommandTypeEnum } from '../../lib/Command'

import { Action, Event} from './index';
import { OptionModel} from '../../model'

interface Props {
  item: OptionModel
}

interface ItemTypes {
  [key:string]:   React.ReactElement<any>;
}

class Item extends React.Component<Props> {
  getSpecificItem(item: OptionModel) {
    const types: ItemTypes = {
      EVENT: <Event>{item._id}</Event>,
      ACTION: <Action>{item._id}</Action>
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
