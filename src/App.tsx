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
} from '@material-ui/core';
import Workflows from './pages/Workflows';
import Show from './pages/Workflows/components/Show';
import States from './pages/Stages';
import Pipelines from './pages/Pipelines';
import withRoot from './withRoot';

import { PipelineModel } from './pages/Pipelines/models';

interface Props extends WithStyles<typeof styles> {
}

const history = createBrowserHistory();
class App extends React.Component<Props> {

  state = {
    value: history.location.pathname,
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
    history.push(value);
    this.setState({value})
  }

  handlePipelineSelect = (selectedPipeline: PipelineModel) => {
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
            <Toolbar>
              <div>
                <Typography variant="h6" color="inherit" noWrap>
                  ATS MVP
                </Typography>
              </div>
              <Tabs
                value={history.location.pathname.split("/")[1]}
                indicatorColor="secondary"
                textColor="inherit"
                centered
                onChange={this.handleCallToRouter}
                className={classes.tabs}
              >
                <Tab label="Stages" value="" />
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
            <Route exact={true} path="/" render={()=><States stages={selectedPipeline.stages}/>} />
            <Route exact={true} path="/workflows" render={()=><Workflows workflows={selectedPipeline.workflows}/>} />
            <Route exact={true} path="/workflows/:id" component={Show} />
          </main>
        </div>
      </Router>
    );
  }
}

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    padding: theme.spacing.unit * 3,
  },
  tabs: {
    width: "100%"
  }
});

export default withRoot(withStyles(styles)(App));
