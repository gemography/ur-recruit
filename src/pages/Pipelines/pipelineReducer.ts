import { Reducer } from 'redux'

import {
  PipelineActions,
  PipelineActionType
} from './actions';

import { PipelineModel } from './models';

export interface PipelineState {
  pipelines: Array<PipelineModel>,
  loading: boolean,
  errorMessage: string,
  selectedPipeline: PipelineModel,
}

const initialState: PipelineState = {
  pipelines: [] as Array<PipelineModel>,
  loading: false,
  errorMessage: "",
  selectedPipeline: {} as PipelineModel
}

const pipelineReducer: Reducer<PipelineState> = (state = initialState, action: PipelineActions) => {
  if (action.type === PipelineActionType.ACTION_PIPELINE_FETCH ) {
    return {
      ...state,
      loading: true,
      pipelines: [] as Array<PipelineModel>,
    };
  }
  if (action.type === PipelineActionType.ACTION_PIPELINE_FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      pipelines: action.pipelines,
    };
  }
  if (action.type === PipelineActionType.ACTION_PIPELINE_FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      pipelines: [] as Array<PipelineModel>,
      errorMessage: action.errorMessage
    };
  }
  if (action.type === PipelineActionType.ACTION_SELECT_PIPELINE) {
    return {
      ...state,
      selectedPipeline: action.selectedPipeline
    };
  }
  if (action.type === PipelineActionType.ACTION_CREATE_WORKFLOW) {
    return {
      ...state,
      selectedPipeline: {
        ...state.selectedPipeline,
        workflows: [...state.selectedPipeline.workflows, action.workflow]
      }
    };
  }
  if (action.type === PipelineActionType.ACTION_UPDATE_WORKFLOW) {
    return {
      ...state,
      selectedPipeline: {
        ...state.selectedPipeline,
        workflows: [
          ...state.selectedPipeline.workflows.map(workflow => {
            return (workflow._id === action.workflow._id)?
              {...workflow, name: action.workflow.name}:
              workflow
          })
        ]
      }
    };
  }
  if (action.type === PipelineActionType.ACTION_REMOVE_WORKFLOW) {
    return {
      ...state,
      selectedPipeline: {
        ...state.selectedPipeline,
        workflows: [
          ...state.selectedPipeline.workflows.filter(workflow=> workflow._id !== action._id)
        ]
      }
    };
  }
  return state;
}

export default pipelineReducer
