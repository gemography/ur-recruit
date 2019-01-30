export enum CommandTypeEnum {
  TAG_EVENT,
  STAGE_EVENT,
  WEBHOOK_EVENT,
  EMAIL_ACTION,
  TAG_ACTION,
  STAGE_ACTION,
  DISQUALIFY_ACTION,
  WAIT_CONDITION,
  IF_ELSE_CONDITION
}

abstract class Command {
  private _position: number;
  private _type: CommandTypeEnum;

  constructor(position: number, type: CommandTypeEnum) {
    this._position = position;
    this._type = type;
  }

  get position(): number {
    return this._position
  }

  set position(position: number) {
    this._position = position;
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
