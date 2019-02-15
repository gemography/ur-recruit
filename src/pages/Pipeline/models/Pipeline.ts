import { WorkflowModel } from '../../Workflow/model'
import { StageModel } from '../../Stage/model'

export default interface OptionModel {
  _id: string;
  name: string;
  stages: Array<StageModel>;
  workflows: Array<WorkflowModel>;
}
