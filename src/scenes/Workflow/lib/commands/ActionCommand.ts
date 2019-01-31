import Command, { CommandTypeEnum } from '../Command'
import Api, { ApiModelEnum } from '../../../../services/Api';

export enum ActionMethodEnum {
  EMAIL = "EMAIL",
  TAG = "TAG",
  STAGE = "STAGE",
  DISQUALIFY = "DISQUALIFY"
}

class ActionCommand extends Command {
  private _method: ActionMethodEnum;

  constructor(
    type: CommandTypeEnum,
    method: ActionMethodEnum
  ) {
    super(type);
    this._method = method;
  }

  get method(): ActionMethodEnum {
    return this._method
  }

  set method(method: ActionMethodEnum) {
    this._method = method;
  }

  async execute(parent: string): Promise<any> {
    const option = await new Api(ApiModelEnum.option).create({
      parent,
      method: ActionMethodEnum[this.method],
      type: CommandTypeEnum[this.type]
    })
    return option;
  }
}

export default ActionCommand;
