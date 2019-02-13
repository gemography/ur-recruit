import Command from '../lib/Command'
import OptionModel from './Option'

export default interface OptionMenuItemModel {
  option: OptionModel;
  command: Command;
}
