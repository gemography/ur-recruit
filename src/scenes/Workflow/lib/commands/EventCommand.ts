import Command, { CommandTypeEnum } from '../Command'

export enum EventMethodEnum {
  TAG,
  STAGE,
  WEBHOOK
}

class EventCommand extends Command {
  private _method: EventMethodEnum;

  constructor(
    type: CommandTypeEnum,
    method: EventMethodEnum
  ) {
    super(type);
    this._method = method;
  }

  get method(): EventMethodEnum {
    return this._method
  }

  set method(method: EventMethodEnum) {
    this._method = method;
  }

  execute(parent: string): void {
    console.log("Execute " + EventMethodEnum[this.method] +" of type " + CommandTypeEnum[this.type] + " on position " + parent);
  }
}

export default EventCommand;
