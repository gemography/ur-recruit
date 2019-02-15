import * as React from 'react';
import { Route, RouteComponentProps, Router } from 'react-router'
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
import Workflow from './pages/Workflow';
import State from './pages/Stage';
import withRoot from './withRoot';

interface Props extends WithStyles<typeof styles> {
}

const history = createBrowserHistory();
class App extends React.Component<Props> {

  state = {
    value: history.location.pathname,
    open: true
  }

  handleCallToRouter = (event:any, value: string) => {
    history.push(value);
    this.setState({value})
  }

  handleDrawerToggle = () => {
    const { open } = this.state;
    this.setState({open: !open});
  }

  handleCreatePipeline = () => { }

  routes = (
    <div>
      <Route exact={true} path="/" component={State} />
      <Route exact={true} path="/workflows" component={Workflow} />
    </div>
  );

  render(): React.ReactNode {
    const { classes } = this.props;
    const { open } = this.state;

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
                value={history.location.pathname}
                indicatorColor="secondary"
                textColor="inherit"
                centered
                onChange={this.handleCallToRouter}
                className={classes.tabs}
              >
                <Tab label="Stages" value="/" />
                <Tab label="Workflow" value="/workflows" />
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
            {this.routes}
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
