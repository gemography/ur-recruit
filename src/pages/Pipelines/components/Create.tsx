import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

interface Props extends WithStyles<typeof styles> {
  onPipelineCreate: () => void;
}

class Create extends React.Component<Props> {
  state = {
    isEditMode: false,
    name: ""
  }

  openEditMode = () => this.setState({isEditMode: true});
  closeEditMode = () => this.setState({isEditMode: false});
  handleChange = (event: any) => {
    this.setState({name: event.target.value})
  }

  render(): React.ReactNode {
    const { isEditMode, name } = this.state
    const { classes } = this.props;

    return (
      <List>
        {isEditMode?

        <ListItem>
          <TextField
            id="pipeline-name"
            label="Pipeline Name"
            value={name}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SaveIcon className={classes.save} onClick={this.closeEditMode} />
                </InputAdornment>
              ),
            }}
          />
        </ListItem>:
        <ListItem
          button
          onClick={this.openEditMode}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create a pipeline" />
        </ListItem>
        }
      </List>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  toolbar: theme.mixins.toolbar,
  save: {
    cursor: "pointer"
  }
});

export default withStyles(styles)(Create);
