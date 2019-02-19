import { combineReducers } from 'redux'
import workflowsReducer from './pages/Workflows/workflowsReducer'
import pipelineReducer from './pages/Pipelines/pipelineReducer'

export default combineReducers({
  workflowsReducer,
  pipelineReducer,
});
