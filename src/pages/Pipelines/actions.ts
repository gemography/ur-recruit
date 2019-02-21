import axios from 'axios';
import { PipelineModel } from './models'
import { Action, Dispatch } from 'redux';
import Api from '../../services/Api';
import { WorkflowModel } from '../Workflows/models';
import { StageModel } from '../Stages/models';

export enum PipelineActionType {
  ACTION_PIPELINE_FETCH = "ACTION_PIPELINE_FETCH",
  ACTION_PIPELINE_FETCH_SUCCESS = "ACTION_PIPELINE_FETCH_SUCCESS",
  ACTION_PIPELINE_FETCH_ERROR = "ACTION_PIPELINE_FETCH_ERROR",
  ACTION_SELECT_PIPELINE = "ACTION_SELECT_PIPELINE",
  ACTION_CREATE_WORKFLOW = "ACTION_CREATE_WORKFLOW",
  ACTION_UPDATE_WORKFLOW = "ACTION_UPDATE_WORKFLOW",
  ACTION_REMOVE_WORKFLOW = "ACTION_REMOVE_WORKFLOW",
  ACTION_CREATE_PIPELINE = "ACTION_CREATE_PIPELINE",
  ACTION_UPDATE_PIPELINE = "ACTION_UPDATE_PIPELINE",
  ACTION_REMOVE_PIPELINE = "ACTION_REMOVE_PIPELINE",
  ACTION_CREATE_STAGE = "ACTION_CREATE_STAGE",
  ACTION_UPDATE_STAGE = "ACTION_UPDATE_STAGE",
  ACTION_REMOVE_STAGE = "ACTION_REMOVE_STAGE",
}

export type PipelineActions = IActionPipelineFetch |
  IActionPipelineFetchSuccess |
  IActionPipelineFetchError |
  IActionSelectPipeline |
  IActionCreatePipeline |
  IActionUpdatePipeline |
  IActioRemovePipeline |
  IActionCreateWorkflow |
  IActionUpdateWorkflow |
  IActioRemoveWorkflow |
  IActionCreateStage |
  IActionUpdateStage |
  IActionRemoveStage;

interface IActionPipelineFetch extends Action {
  type: PipelineActionType.ACTION_PIPELINE_FETCH
}

interface IActionPipelineFetchSuccess extends Action {
  type: PipelineActionType.ACTION_PIPELINE_FETCH_SUCCESS,
  pipelines: Array<PipelineModel>
}

interface IActionPipelineFetchError extends Action {
  type: PipelineActionType.ACTION_PIPELINE_FETCH_ERROR,
  errorMessage: string
}

interface IActionSelectPipeline extends Action {
  type: PipelineActionType.ACTION_SELECT_PIPELINE,
  selectedPipeline: PipelineModel
}

interface IActionCreatePipeline extends Action {
  type: PipelineActionType.ACTION_CREATE_PIPELINE,
  pipeline: PipelineModel
}

interface IActionUpdatePipeline extends Action {
  type: PipelineActionType.ACTION_UPDATE_PIPELINE,
  pipeline: PipelineModel
}

interface IActioRemovePipeline extends Action {
  type: PipelineActionType.ACTION_REMOVE_PIPELINE,
  _id: string
}

interface IActionCreateWorkflow extends Action {
  type: PipelineActionType.ACTION_CREATE_WORKFLOW,
  workflow: WorkflowModel
}

interface IActionUpdateWorkflow extends Action {
  type: PipelineActionType.ACTION_UPDATE_WORKFLOW,
  workflow: WorkflowModel
}

interface IActioRemoveWorkflow extends Action {
  type: PipelineActionType.ACTION_REMOVE_WORKFLOW,
  _id: string
}

interface IActionCreateStage extends Action {
  type: PipelineActionType.ACTION_CREATE_STAGE,
  stage: StageModel
}

interface IActionUpdateStage extends Action {
  type: PipelineActionType.ACTION_UPDATE_STAGE,
  stage: StageModel
}

interface IActionRemoveStage extends Action {
  type: PipelineActionType.ACTION_REMOVE_STAGE,
  _id: string
}

function dispatchFetchPipelineProgress(): IActionPipelineFetch {
  return {
    type: PipelineActionType.ACTION_PIPELINE_FETCH
  };
}

function dispatchFetchPipelineSuccess(pipelines: Array<PipelineModel>): IActionPipelineFetchSuccess {
  return {
    type: PipelineActionType.ACTION_PIPELINE_FETCH_SUCCESS,
    pipelines
  };
}

function dispatchFetchPipelineError(e: Error): IActionPipelineFetchError {
  return {
    type: PipelineActionType.ACTION_PIPELINE_FETCH_ERROR,
    errorMessage: e.message
  };
}

function dispatchSelectPipeline(selectedPipeline: PipelineModel): IActionSelectPipeline {
  return {
    type: PipelineActionType.ACTION_SELECT_PIPELINE,
    selectedPipeline
  };
}


function dispatchCreatePipeline(pipeline: PipelineModel): IActionCreatePipeline {
  return {
    type: PipelineActionType.ACTION_CREATE_PIPELINE,
    pipeline
  };
}

function dispatchUpdatePipeline(pipeline: PipelineModel): IActionUpdatePipeline {
  return {
    type: PipelineActionType.ACTION_UPDATE_PIPELINE,
    pipeline
  };
}

function dispatchRemovePipeline(_id: string): IActioRemovePipeline {
  return {
    type: PipelineActionType.ACTION_REMOVE_PIPELINE,
    _id
  };
}

function dispatchCreateWorkflow(workflow: WorkflowModel): IActionCreateWorkflow {
  return {
    type: PipelineActionType.ACTION_CREATE_WORKFLOW,
    workflow
  };
}

function dispatchUpdateWorkflow(workflow: WorkflowModel): IActionUpdateWorkflow {
  return {
    type: PipelineActionType.ACTION_UPDATE_WORKFLOW,
    workflow
  };
}

function dispatchRemoveWorkflow(_id: string): IActioRemoveWorkflow {
  return {
    type: PipelineActionType.ACTION_REMOVE_WORKFLOW,
    _id
  };
}

function dispatchCreateStage(stage: StageModel): IActionCreateStage {
  return {
    type: PipelineActionType.ACTION_CREATE_STAGE,
    stage
  };
}

function dispatchUpdateStage(stage: StageModel): IActionUpdateStage {
  return {
    type: PipelineActionType.ACTION_UPDATE_STAGE,
    stage
  };
}

function dispatchRemoveStage(_id: string): IActionRemoveStage {
  return {
    type: PipelineActionType.ACTION_REMOVE_STAGE,
    _id
  };
}

export const actionSelectPipeline = (selectedPipeline: PipelineModel) => {
  return (dispatch: Dispatch) =>
    dispatch(dispatchSelectPipeline(selectedPipeline));
}

export const actionFetchPipelines = (pipelineId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(dispatchFetchPipelineProgress());
    axios.get(`${Api.baseUrl}/pipelines`)
      .then(({data: { pipelines }}) => {
        dispatch(dispatchSelectPipeline(
          pipelines.filter((pipeline: PipelineModel) => pipeline._id === pipelineId)[0]
        ))
        return dispatch(dispatchFetchPipelineSuccess(pipelines));
      })
      .catch((e: Error) => {
        return dispatch(dispatchFetchPipelineError(e));
      });
  };
}

export const actionCreatePipeline = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const {data: {pipeline} } = await axios.post(`${Api.baseUrl}/pipelines`, { name });
      dispatch(dispatchCreatePipeline(pipeline))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionUpdatePipeline = (_id: string, name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.put(`${Api.baseUrl}/pipelines/${_id}`, { name });
      dispatch(dispatchUpdatePipeline({_id, name} as PipelineModel))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionRemovePipeline = (_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`${Api.baseUrl}/pipelines/${_id}`);
      dispatch(dispatchRemovePipeline(_id))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionCreateWorkflow = (pipeline_id: string, name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data: {workflow}} = await axios.post(
        `${Api.baseUrl}/pipelines/${pipeline_id}/workflows`,
        { name }
      );
      dispatch(dispatchCreateWorkflow(workflow))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionUpdateWorkflow = (_id: string, name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      axios.put(`${Api.baseUrl}/workflows/${_id}`, { name });
      dispatch(dispatchUpdateWorkflow({_id, name} as WorkflowModel))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionRemoveWorkflow = (pipeline_id: string, _id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`${Api.baseUrl}/pipelines/${pipeline_id}/workflows/${_id}`);
      dispatch(dispatchRemoveWorkflow(_id))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionCreateStage = (pipeline_id: string, name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data: {stage}} = await axios.post(
        `${Api.baseUrl}/pipelines/${pipeline_id}/stages/`,
        { name }
      );
      dispatch(dispatchCreateStage(stage))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionUpdateStage = (_id: string, name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      axios.put(`${Api.baseUrl}/stages/${_id}`, { name });
      dispatch(dispatchUpdateStage({_id, name} as StageModel))
    } catch (e) {
      console.log(e)
    }
  };
}

export const actionRemoveStage = (pipeline_id: string, _id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`${Api.baseUrl}/pipelines/${pipeline_id}/stages/${_id}`);
      dispatch(dispatchRemoveStage(_id))
    } catch (e) {
      console.log(e)
    }
  };
}
