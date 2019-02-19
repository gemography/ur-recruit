import axios from 'axios';
import { PipelineModel } from './models'
import { Action, Dispatch } from 'redux';
import Api from '../../services/Api';

export enum PipelineActionType {
  ACTION_PIPELINE_FETCH = "ACTION_PIPELINE_FETCH",
  ACTION_PIPELINE_FETCH_SUCCESS = "ACTION_PIPELINE_FETCH_SUCCESS",
  ACTION_PIPELINE_FETCH_ERROR = "ACTION_PIPELINE_FETCH_ERROR",
  ACTION_SELECT_PIPELINE = "ACTION_SELECT_PIPELINE",
}

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

export type PipelineActions = IActionPipelineFetch | IActionPipelineFetchSuccess | IActionPipelineFetchError | IActionSelectPipeline;

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
