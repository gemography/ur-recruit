import Command, { CommandTypeEnum } from '../Command'

export enum ConditionMethodEnum {
  WAIT,
  IF_ELSE
}

class ConditionCommand extends Command {
  private _method: ConditionMethodEnum;

  constructor(
    parent: string,
    type: CommandTypeEnum,
    method: ConditionMethodEnum
  ) {
    super(parent, type);
    this._method = method;
  }

  get method(): ConditionMethodEnum {
    return this._method
  }

  set method(method: ConditionMethodEnum) {
    this._method = method;
  }

  execute(): void {
    console.log("Execute " + ConditionMethodEnum[this.method] +" of type " + CommandTypeEnum[this.type] + " on position " + this.parent);
  }
}

export default ConditionCommand;
