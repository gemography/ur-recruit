import { WorkflowModel } from '../../Workflows/models'
import { StageModel } from '../../Stages/models'

export default interface PipelineModel {
  _id: string;
  name: string;
  stages: Array<StageModel>;
  workflows: Array<WorkflowModel>;
}
