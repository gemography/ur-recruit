import * as React from 'react';

import { Action, Event, Condition} from './index';
import { CommandTypeEnum } from '../../lib/Command'

interface Props {
  type: CommandTypeEnum
  text: string
}

interface ItemTypes {
  [key:string]: React.ReactElement<any>;
}

class Item extends React.Component<Props> {
  getSpecificItem(text: string) {
    const types: ItemTypes = {
      EVENT: <Event>{text}</Event>,
      ACTION: <Action>{text}</Action>,
      CONDITION: <Condition>{text}</Condition>
    };
    return types;
  }

  render() {
    const { type, text } = this.props;

    return (
      <> { this.getSpecificItem(text)[type] } </>
    );
  }
}

export default Item;
