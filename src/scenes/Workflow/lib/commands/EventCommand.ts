import Command, { CommandTypeEnum } from '../Command'

class EventCommand extends Command {

  execute(): void {
    console.log("Execute EventCommand of type " + CommandTypeEnum[this.type] + " on position " + this.position);
  }
}

export default EventCommand;
