import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router'
import { createBrowserHistory } from 'history';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Tabs,
  Tab,
  Toolbar,
  AppBar,
  Typography,
  Drawer,
} from '@material-ui/core';
import Workflows from './pages/Workflows';
import States from './pages/Stages';
import Pipelines from './pages/Pipelines';
import Welcome from './pages/Welcome';
import withRoot from './withRoot';

import { PipelineModel } from './pages/Pipelines/models';

interface Props extends WithStyles<typeof styles> {
  pipelines: Array<PipelineModel>;
  selectedPipeline: PipelineModel;
}

const history = createBrowserHistory();
class App extends React.Component<Props> {

  state = {
    value: history.location.pathname.split("/")[2] || "stages"
  }

  setHistory (selectedPipeline_id: string, value: string) {
    selectedPipeline_id && history.push(`/${selectedPipeline_id}/${value}`);
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { value } = this.state;
    const { selectedPipeline, pipelines } = nextProps;
    if(pipelines.length <= 0) history.push(`/`);
    selectedPipeline && this.setHistory(selectedPipeline._id, value);

  }

  handleCallToRouter = (event:any, value: string) => {
    const { selectedPipeline } = this.props;
    selectedPipeline && this.setHistory(selectedPipeline._id, value)
    this.setState({value})
  }

  render(): React.ReactNode {
    const { classes, selectedPipeline } = this.props;
    const { value } = this.state;
    return (
      <Router history={history}>
        <div className={classes.root}>
          {selectedPipeline && selectedPipeline._id &&
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <Typography color="inherit" variant="h6" className={classes.title}>
                  {selectedPipeline.name}
                </Typography>
                <Tabs
                  value={value}
                  indicatorColor="secondary"
                  textColor="inherit"
                  onChange={this.handleCallToRouter}
                  className={classes.tabs}
                >
                  <Tab label="Stages" value="stages" />
                  <Tab label="Workflows" value="workflows" />
                </Tabs>
              </Toolbar>
            </AppBar>
          }
          <Pipelines selectedId={history.location.pathname.split("/")[1]} />
          <main className={classes.content}>
            <Route exact={true} path="/:pipeline_id/stages" component={States} />
            <Route exact={true} path="/:pipeline_id/workflows" component={Workflows} />
            <Route exact={true} path="/" component={Welcome} />
          </main>
        </div>
      </Router>
    );
  }
}

const drawerWidth = 320;
const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  title: {
    padding: 16
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  toolbar: {
    display: "block",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 112
  },
  tabContainer:{
    backgroundColor: theme.palette.common.white
  },
  tabs: {
    width: "100%"
  }
});

function mapStateToProps(state: any) {
  const { selectedPipeline, pipelines } = state.pipelineReducer

  return {
    pipelines,
    selectedPipeline
  };
}

export default withRoot(withStyles(styles)(connect(mapStateToProps)(App)));
