import axios from 'axios';
import { WorkflowModel } from '../model'
import { Action, Dispatch } from 'redux';
import Api from '../../../services/Api';

export enum WorkflowActionType {
  ACTION_WORKFLOW_FETCH = "ACTION_WORKFLOW_FETCH",
  ACTION_WORKFLOW_FETCH_SUCCESS = "ACTION_WORKFLOW_FETCH_SUCCESS",
  ACTION_WORKFLOW_FETCH_ERROR = "ACTION_WORKFLOW_FETCH_ERROR"
}

interface IActionWorkflowFetch extends Action {
  type: WorkflowActionType.ACTION_WORKFLOW_FETCH
}

interface IActionWorkflowFetchSuccess extends Action {
  type: WorkflowActionType.ACTION_WORKFLOW_FETCH_SUCCESS,
  workflow: WorkflowModel
}

interface IActionWorkflowFetchError extends Action {
  type: WorkflowActionType.ACTION_WORKFLOW_FETCH_ERROR,
  errorMessage: string
}

export type WorkflowActions = IActionWorkflowFetch | IActionWorkflowFetchSuccess | IActionWorkflowFetchError;

function dispatchFetchWorkflowProgress(): IActionWorkflowFetch {
  return {
    type: WorkflowActionType.ACTION_WORKFLOW_FETCH
  };
}

function dispatchFetchWorkflowSuccess(workflow: WorkflowModel): IActionWorkflowFetchSuccess {
  return {
    type: WorkflowActionType.ACTION_WORKFLOW_FETCH_SUCCESS,
    workflow
  };
}

function dispatchFetchWorkflowError(e: Error): IActionWorkflowFetchError {
  return {
    type: WorkflowActionType.ACTION_WORKFLOW_FETCH_ERROR,
    errorMessage: e.message
  };
}

export const actionFetchWorkflow = () => {
  return (dispatch: Dispatch) => {
    dispatch(dispatchFetchWorkflowProgress());
    axios.get(`${Api.baseUrl}/workflows/${Api.testWorkflow}`)
      .then(({data: { workflow }}) => {
        return dispatch(dispatchFetchWorkflowSuccess(workflow));
      })
      .catch((e: Error) => {
        return dispatch(dispatchFetchWorkflowError(e));
      });
  };
}
