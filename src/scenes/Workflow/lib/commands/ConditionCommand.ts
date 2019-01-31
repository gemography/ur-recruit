import Command, { CommandTypeEnum } from '../Command'
import Api, { ApiModelEnum } from '../../../../services/Api';

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
    const option = await new Api(ApiModelEnum.option).create({
      parent,
      method: ConditionMethodEnum[this.method],
      type: CommandTypeEnum[this.type]
    })
    return option;
  }
}

export default ConditionCommand;
