import Command, { CommandTypeEnum } from '../Command'
import Api from '../../../../services/Api';
import axios from 'axios';

export enum EventMethodEnum {
  TAG = "TAG",
  STAGE = "STAGE",
  WEBHOOK = "WEBHOOK"
}

class EventCommand extends Command {
  private _method: EventMethodEnum;

  constructor( method: EventMethodEnum ) {
    super(CommandTypeEnum.EVENT);
    this._method = method;
  }

  get method(): EventMethodEnum {
    return this._method
  }

  set method(method: EventMethodEnum) {
    this._method = method;
  }

  async execute(workflowId: string, parent: string): Promise<any> {
    const endpoint = this.method === EventMethodEnum.WEBHOOK? "webhooks" : "";
    const { data: {option} } = await axios.post(
      `${Api.baseUrl}/workflows/${workflowId}/options/${endpoint}`, {
      parent,
      method: EventMethodEnum[this.method],
      type: CommandTypeEnum[this.type]
    })
    return option;
  }
}

export default EventCommand;
