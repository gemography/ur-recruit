export enum CommandTypeEnum {
  EVENT,
  ACTION,
  CONDITION
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

  abstract execute(parent: string): void;
}

export default Command;
