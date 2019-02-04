import { Reducer } from 'redux'

import {
  WorkflowActions,
  WorkflowActionType
} from '../pages/Workflow/actions';

import { WorkflowModel } from '../pages/Workflow/model';

export interface WorkflowState {
  workflow: WorkflowModel,
  errorMessage: string
}

const initialState: WorkflowState = {
  workflow: {} as WorkflowModel,
  errorMessage: ""
}

const workflowsReducer: Reducer<WorkflowState> = (state = initialState, action: WorkflowActions) => {
  if (action.type === WorkflowActionType.ACTION_WORKFLOW_FETCH ) {
    return {
      ...state,
      workflow: {} as WorkflowModel,
    };
  }
  if (action.type === WorkflowActionType.ACTION_WORKFLOW_FETCH_SUCCESS) {
    return {
      ...state,
      workflow: action.workflow,
    };
  }
  if (action.type === WorkflowActionType.ACTION_WORKFLOW_FETCH_ERROR) {
    return {
      ...state,
      workflow: {} as WorkflowModel,
      errorMessage: action.errorMessage
    };
  }
  return state;
}

export default workflowsReducer
