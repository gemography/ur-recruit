import Option from './Option'

export default interface WorkflowModel {
  _id: string;
  name: string;
  event: Option
  children: Array<Option>;
}
