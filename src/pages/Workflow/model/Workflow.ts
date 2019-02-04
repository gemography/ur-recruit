import OptionModel from './Option'

export default interface WorkflowModel {
  _id: string;
  name: string;
  event: string
  children: Array<OptionModel>;
}
