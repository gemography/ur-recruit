import * as React from 'react';
import { Route, Router } from 'react-router'
import axios from 'axios';
import Api from './services/Api';
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
  Hidden,
  Drawer,
  Grid,
} from '@material-ui/core';
import Workflows from './pages/Workflows';
import States from './pages/Stages';
import Pipelines from './pages/Pipelines';
import withRoot from './withRoot';

import { PipelineModel } from './pages/Pipelines/models';

interface Props extends WithStyles<typeof styles> {
}

const history = createBrowserHistory();
class App extends React.Component<Props> {

  state = {
    value: "stages",
    open: true,
    pipelines: [] as Array<PipelineModel>,
    selectedPipeline: {} as PipelineModel
  }

  componentDidMount = async () => {
    const {data: {pipelines}} = await axios.get(`${Api.baseUrl}/pipelines`);
    this.setState({
      pipelines,
      selectedPipeline: pipelines[0]
    })
  }

  handleCallToRouter = (event:any, value: string) => {
    const { selectedPipeline } = this.state;
    history.push(`/pipelines/${selectedPipeline._id}/${value}`);
    this.setState({value})
  }

  handlePipelineSelect = (selectedPipeline: PipelineModel) => {
    const { value } = this.state;
    history.push(`/pipelines/${selectedPipeline._id}/${value}`);
    this.setState({selectedPipeline})
  }

  handlePipelineCreate = () => { }

  render(): React.ReactNode {
    const { classes } = this.props;
    const { open, pipelines, selectedPipeline } = this.state;

    return (
      <Router history={history}>
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography color="inherit" variant="h6" className={classes.title}>
                {selectedPipeline.name}
              </Typography>
              <Tabs
                value={history.location.pathname.split("/")[3]}
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
          <nav className={classes.drawer}>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open={open}
              >
                <Pipelines
                  pipelines={pipelines}
                  selectedPipeline={selectedPipeline}
                  onPipelineSelect={this.handlePipelineSelect}
                  onPipelineCreate={this.handlePipelineCreate}
                />
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <Route exact={true} path="/pipelines/:pipeline_id/stages" render={()=><States stages={selectedPipeline.stages}/>} />
            <Route exact={true} path="/pipelines/:pipeline_id/workflows" render={()=><Workflows workflows={selectedPipeline.workflows}/>} />
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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

export default withRoot(withStyles(styles)(App));
