import Command, { CommandTypeEnum } from '../Command'

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

  execute(parent: string): void {
    console.log("Execute " + ConditionMethodEnum[this.method] +" of type " + CommandTypeEnum[this.type] + " on position " + parent);
  }
}

export default ConditionCommand;
