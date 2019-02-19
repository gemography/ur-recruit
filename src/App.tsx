import * as React from 'react';
import { connect } from 'react-redux';
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
  selectedPipeline: PipelineModel
}

const history = createBrowserHistory();
class App extends React.Component<Props> {

  state = {
    value: history.location.pathname.split("/")[3] || "stages",
    open: true
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { value } = this.state;
    const { selectedPipeline } = nextProps;

    selectedPipeline && history.push(`/pipelines/${selectedPipeline._id}/${value}`);
  }

  handleCallToRouter = (event:any, value: string) => {
    const { selectedPipeline } = this.props;
    history.push(`/pipelines/${selectedPipeline._id}/${value}`);
    this.setState({value})
  }

  render(): React.ReactNode {
    const { classes, selectedPipeline } = this.props;
    const { open, value } = this.state;
    return (
      <Router history={history}>
        <div className={classes.root}>
          {selectedPipeline &&
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
          <nav className={classes.drawer}>
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open={open}
            >
              <Pipelines pipelineId={history.location.pathname.split("/")[2]} />
            </Drawer>
          </nav>
          <main className={classes.content}>
            <Route exact={true} path="/pipelines/:pipeline_id/stages" component={States} />
            <Route exact={true} path="/pipelines/:pipeline_id/workflows" component={Workflows} />
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

function mapStateToProps(state: any) {
  const { selectedPipeline } = state.pipelineReducer

  return {
    selectedPipeline
  };
}

export default withRoot(withStyles(styles)(connect(mapStateToProps)(App)));
