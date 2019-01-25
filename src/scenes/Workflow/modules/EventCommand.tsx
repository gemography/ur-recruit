import Command from './Command'

class EventCommand extends Command {

  execute(): void {
    console.log("Execute EventCommand of type " + this.type + " on position " + this.position);
  }
}

export default EventCommand;
