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
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Workflows from './pages/Workflows';
import Show from './pages/Workflows/components/Show';
import States from './pages/Stages';
import withRoot from './withRoot';

import { PipelineModel } from './pages/Pipeline/models';

interface Props extends WithStyles<typeof styles> {
}

const history = createBrowserHistory();
class App extends React.Component<Props> {

  state = {
    value: history.location.pathname,
    open: true,
    pipeline: {} as PipelineModel
  }

  componentDidMount = async () => {
    const {data: {pipeline}} = await axios.get(`${Api.baseUrl}/pipelines/${Api.testPipeline}`);
    this.setState({pipeline})
  }

  handleCallToRouter = (event:any, value: string) => {
    history.push(value);
    this.setState({value})
  }

  handleCreatePipeline = () => { }

  render(): React.ReactNode {
    const { classes } = this.props;
    const { open, pipeline } = this.state;

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
                <div>
                  <div className={classes.toolbar}>
                    <Typography variant="h6" color="inherit">
                      Pipelines
                    </Typography>
                  </div>
                  <Divider />
                  <List
                    subheader={<ListSubheader component="div">Pipelines</ListSubheader>}
                  >
                    <ListItem button selected key="front end web dev">
                      <ListItemText primary="front end web dev" />
                    </ListItem>
                    <ListItem button key="back end web dev">
                      <ListItemText primary="back end web dev" />
                    </ListItem>
                    <ListItem button key="Software Engeneer Intern">
                      <ListItemText primary="Software Engeneer Intern" />
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem
                      button
                      onClick={this.handleCreatePipeline}
                    >
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create a pipeline" />
                    </ListItem>
                  </List>
                </div>
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <Route exact={true} path="/" render={()=><States stages={pipeline.stages}/>} />
            <Route exact={true} path="/workflows" render={()=><Workflows workflows={pipeline.workflows}/>} />
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
  toolbar: theme.mixins.toolbar,
  tabs: {
    width: "100%"
  }
});

export default withRoot(withStyles(styles)(App));
