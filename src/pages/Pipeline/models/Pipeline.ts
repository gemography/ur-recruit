import { WorkflowModel } from '../../Workflows/model'
import { StageModel } from '../../Stages/model'

export default interface OptionModel {
  _id: string;
  name: string;
  stages: Array<StageModel>;
  workflows: Array<WorkflowModel>;
}
