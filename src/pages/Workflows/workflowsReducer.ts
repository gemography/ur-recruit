import { Reducer } from 'redux'

import {
  WorkflowActions,
  WorkflowActionType
} from './actions';

import { WorkflowModel } from './models';

export interface WorkflowState {
  workflow: WorkflowModel,
  loading: boolean,
  errorMessage: string
}

const initialState: WorkflowState = {
  workflow: {} as WorkflowModel,
  loading: false,
  errorMessage: ""
}

const workflowsReducer: Reducer<WorkflowState> = (state = initialState, action: WorkflowActions) => {
  if (action.type === WorkflowActionType.ACTION_WORKFLOW_FETCH ) {
    return {
      ...state,
      loading: true,
      workflow: {} as WorkflowModel,
    };
  }
  if (action.type === WorkflowActionType.ACTION_WORKFLOW_FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      workflow: action.workflow,
    };
  }
  if (action.type === WorkflowActionType.ACTION_WORKFLOW_FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      workflow: {} as WorkflowModel,
      errorMessage: action.errorMessage
    };
  }
  return state;
}

export default workflowsReducer
