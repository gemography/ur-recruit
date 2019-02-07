import Command, { CommandTypeEnum } from '../Command'
import Api from '../../../../services/Api';
import axios from 'axios';

export enum ConditionMethodEnum {
  WAIT = "WAIT",
  IF_ELSE = "IF_ELSE"
}

class ConditionCommand extends Command {
  private _method: ConditionMethodEnum;

  constructor(
    type: CommandTypeEnum,
    method: ConditionMethodEnum
  ) {
    super(type);
    this._method = method;
  }

  get method(): ConditionMethodEnum {
    return this._method
  }

  set method(method: ConditionMethodEnum) {
    this._method = method;
  }

  async execute(parent: string): Promise<any> {
    const { data: {option} } = await axios.post(`${Api.baseUrl}/workflows/${Api.testWorkflow}/options`, {
      parent,
      method: ConditionMethodEnum[this.method],
      type: CommandTypeEnum[this.type]
    })
    return option;
  }
}

export default ConditionCommand;
