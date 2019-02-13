import * as React from 'react';
import { Route, RouteComponentProps, Router } from 'react-router'
import { createBrowserHistory } from 'history';
import {
  createStyles,
  WithStyles,
  withStyles,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';
import Workflow from './pages/Workflow';
import State from './pages/Stage';
import withRoot from './withRoot';

interface Props extends WithStyles<typeof styles> {
}

const history = createBrowserHistory();
class App extends React.Component<Props> {

  state = {
    value: history.location.pathname
  }

  handleCallToRouter = (event:any, value: string) => {
    history.push(value);
    this.setState({value})
  }

  routes = (
    <div>
      <Route exact={true} path="/" component={State} />
      <Route exact={true} path="/workflows" component={Workflow} />
    </div>
  );

  render(): React.ReactNode {
    return (
      <Router history={history}>
        <>
          <Paper>
            <Tabs
              value={history.location.pathname}
              indicatorColor="primary"
              textColor="primary"
              centered
              onChange={this.handleCallToRouter}
            >
              <Tab label="Stages" value="/" />
              <Tab label="Workflow" value="/workflows" />
            </Tabs>
          </Paper>
          {this.routes}
        </>
      </Router>
    );
  }
}

const styles = () => createStyles({});

export default withRoot(withStyles(styles)(App));
