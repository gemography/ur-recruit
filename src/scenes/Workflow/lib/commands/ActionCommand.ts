import Command, { CommandTypeEnum } from '../Command'

export enum ActionMethodEnum {
  EMAIL,
  TAG,
  STAGE,
  DISQUALIFY
}

class ActionCommand extends Command {
  private _method: ActionMethodEnum;

  constructor(
    parent: string,
    type: CommandTypeEnum,
    method: ActionMethodEnum
  ) {
    super(parent, type);
    this._method = method;
  }

  get method(): ActionMethodEnum {
    return this._method
  }

  set method(method: ActionMethodEnum) {
    this._method = method;
  }

  execute(): void {
    console.log("Execute " + ActionMethodEnum[this.method] +" of type " + CommandTypeEnum[this.type] + " on position " + this.parent);
  }
}

export default ActionCommand;
