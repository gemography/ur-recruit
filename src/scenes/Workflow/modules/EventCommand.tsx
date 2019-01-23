import Command from './Command'

class EventCommand extends Command {

  execute(): void {
    console.log("Execute a EventCommand");
  }
}

export default EventCommand;
