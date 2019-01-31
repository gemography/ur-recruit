export enum CommandTypeEnum {
  EVENT = "EVENT",
  ACTION = "ACTION",
  CONDITION = "CONDITION"
}

abstract class Command {
  private _type: CommandTypeEnum;

  protected constructor(
    type: CommandTypeEnum
  ) {
    this._type = type;
  }

  get type(): CommandTypeEnum {
    return this._type
  }

  set type(type: CommandTypeEnum) {
    this._type = type;
  }

  abstract async execute(parent: string): Promise<any>
}

export default Command;
