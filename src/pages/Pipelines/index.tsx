import * as React from 'react';
import { Link } from 'react-router-dom'
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  ListItem,
  ListItemText,
  IconButton,
  List,
  ListSubheader,
} from '@material-ui/core';
import Create from './components/Create'
import { PipelineModel } from './models'
import AddIcon from '@material-ui/icons/Add';

interface Props extends WithStyles<typeof styles> {
  pipelines: Array<PipelineModel>;
  selectedPipeline: PipelineModel;
  onPipelineSelect: (selectedPipeline: PipelineModel) => void;
  onPipelineCreate: () => void;
}

interface CollapseState {
  [key:string]: any
}

class Workflow extends React.Component<Props> {
  state = {
    collapseState: {} as CollapseState
  };

  handleClick = (id: string) => {
    const {collapseState} = this.state;
    collapseState[id] = !collapseState[id];
    this.setState({ collapseState });
  };

  render(): React.ReactNode {
    const { pipelines, selectedPipeline, onPipelineSelect, onPipelineCreate, classes } = this.props;

    return (
      <div>
        <div className={classes.toolbar}></div>
        <List
          subheader={
            <ListSubheader component="div">
              Pipelines
              <IconButton aria-label="AddPipeline" className={classes.addIcon}>
                <AddIcon fontSize="small" />
              </IconButton>
            </ListSubheader>
          }
        >
        {
          pipelines.map((pipeline, index) =>
            <ListItem button selected={selectedPipeline._id === pipeline._id} key={index} onClick={() => onPipelineSelect(pipeline)}>
              <ListItemText primary={pipeline.name} />
            </ListItem>
          )
        }
        </List>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  toolbar: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 6
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  link: {
    textDecoration: "none"
  },
  addIcon: {
    position: "absolute",
    right: 8,
    top: 2,
    cursor: "pointer"
  }
});

export default withStyles(styles)(Workflow);
