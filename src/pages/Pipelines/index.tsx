import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  List,
  ListSubheader,
} from '@material-ui/core';
import Create from './components/Create'
import { PipelineModel } from './models'

interface Props extends WithStyles<typeof styles> {
  pipelines: Array<PipelineModel>;
  selectedPipeline: PipelineModel;
  onPipelineSelect: (selectedPipeline: PipelineModel) => void;
  onPipelineCreate: () => void;
}

class Workflow extends React.Component<Props> {
  render(): React.ReactNode {
    const { pipelines, selectedPipeline, onPipelineSelect, onPipelineCreate, classes } = this.props;

    return (
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
        {
          pipelines.map((pipeline, index) =>
            <ListItem button selected={selectedPipeline._id === pipeline._id} key={index} onClick={() => onPipelineSelect(pipeline)}>
              <ListItemText primary={pipeline.name} />
            </ListItem>
          )
        }
        </List>
        <Divider />
        <Create onPipelineCreate={onPipelineCreate}/>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(Workflow);
