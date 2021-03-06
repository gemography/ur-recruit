import Command, { CommandTypeEnum } from '../Command'
import axios from 'axios';
import Api from '../../../../services/Api';

export enum ActionMethodEnum {
  EMAIL = "EMAIL",
  TAG = "TAG",
  STAGE = "STAGE",
  DISQUALIFY = "DISQUALIFY"
}

class ActionCommand extends Command {
  private _method: ActionMethodEnum;

  constructor( method: ActionMethodEnum) {
    super(CommandTypeEnum.ACTION);
    this._method = method;
  }

  get method(): ActionMethodEnum {
    return this._method
  }

  set method(method: ActionMethodEnum) {
    this._method = method;
  }

  async execute(workflowId: string, parent: string): Promise<any> {
    const { data: {option} } = await axios.post(`${Api.baseUrl}/workflows/${workflowId}/options`, {
      parent,
      method: ActionMethodEnum[this.method],
      type: CommandTypeEnum[this.type]
    })
    return option;
  }
}

export default ActionCommand;
