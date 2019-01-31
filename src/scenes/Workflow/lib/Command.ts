export enum CommandTypeEnum {
  EVENT,
  ACTION,
  CONDITION
}

abstract class Command {
  private _parent: string;
  private _type: CommandTypeEnum;

  protected constructor(
    parent: string,
    type: CommandTypeEnum
  ) {
    this._parent = parent;
    this._type = type;
  }

  get parent(): string {
    return this._parent
  }

  set parent(parent: string) {
    this._parent = parent;
  }

  get type(): CommandTypeEnum {
    return this._type
  }

  set type(type: CommandTypeEnum) {
    this._type = type;
  }

  abstract execute(): void;
}

export default Command;
