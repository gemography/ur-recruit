import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  ListItem,
  ListItemText,
  List,
  ListSubheader,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Popover,
  Button,
  Grid
} from '@material-ui/core';

import Api from '../../services/Api';
import { actionFetchPipelines, actionSelectPipeline } from './actions'
import { PipelineModel } from './models'
import CreateForm from '../../components/CreateForm';
import InputForm from '../../components/InputForm';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface Props extends WithStyles<typeof styles> {
  pipelines: Array<PipelineModel>;
  pipelineId: string,
  actionFetchPipelines: any,
  actionSelectPipeline: any,
}

class Pipelines extends React.Component<Props> {
  state = {
    menuAnchorEl: null,
    popoverAnchorEl: null,
    pipelineInEdit: {} as PipelineModel,
    isEdit: true
  }

  refreshPipelines = (pipelineId: string) => {
    const { actionFetchPipelines } = this.props;
    actionFetchPipelines(pipelineId);
  }

  componentDidMount() {
    const { pipelineId } = this.props;
    this.refreshPipelines(pipelineId)
  };

  handlePipelineCreate = async (name: string) => {
    const {data: {pipeline} } = await axios.post(`${Api.baseUrl}/pipelines`, { name });
    this.refreshPipelines(pipeline._id);
  };

  handlePipelineDelete = async () => {
    const { pipelineInEdit } = this.state;
    const { pipelines } = this.props;
    await axios.delete(`${Api.baseUrl}/pipelines/${pipelineInEdit._id}`);
    this.refreshPipelines(pipelines.filter(pipeline=> pipeline._id !== pipelineInEdit._id)[0]._id);
    this.closePopover();
  };

  handlePipelineUpdate = async (name: string) => {
    const { pipelineInEdit } = this.state;
    const {data: {pipeline} } = await axios.put(`${Api.baseUrl}/pipelines/${pipelineInEdit._id}`, { name });
    this.refreshPipelines(pipelineInEdit._id);
    this.closePopover();
  };

  handlePipelineSelect = (selectedPipeline: PipelineModel) => {
    const { actionSelectPipeline } = this.props;
    actionSelectPipeline(selectedPipeline);
  };

  openMenu = (event: any, pipelineInEdit: PipelineModel) => this.setState({
    menuAnchorEl: event.currentTarget,
    pipelineInEdit
  });
  closeMenu = () => this.setState({menuAnchorEl: null});

  openPopover = (event: any, isEdit: boolean) => this.setState({
    popoverAnchorEl: event.currentTarget,
    menuAnchorEl: null,
    isEdit
  });
  closePopover = () => this.setState({popoverAnchorEl: null});

  render(): React.ReactNode {
    const { menuAnchorEl, popoverAnchorEl, pipelineInEdit, isEdit } = this.state;
    const open = Boolean(popoverAnchorEl);
    const { pipelines, classes, pipelineId } = this.props;

    return (
      <div>
        <div className={classes.appName}>
          <Typography color="primary" variant="h5">ATS MVP</Typography>
        </div>
        <List
          subheader={
            <ListSubheader component="div">
              Pipelines
              <CreateForm onSave={this.handlePipelineCreate}/>
            </ListSubheader>
          }
        >
        {
          pipelines.map((pipeline, index) =>
            <ListItem
              className={classes.listItem}
              classes={{
                container: classes.listItem
              }}
              button
              selected={pipeline._id === pipelineId}
              key={index}
              onClick={() => this.handlePipelineSelect(pipeline)}
            >
              <ListItemText primary={pipeline.name} />
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                <IconButton
                  aria-owns={menuAnchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  aria-label="Menu"
                  onClick={event => this.openMenu(event, pipeline)}>
                  <MoreHorizIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        }
        </List>
        <Menu id="simple-menu" anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={this.closeMenu}>
          <MenuItem
            aria-owns={open ? 'simple-popper' : undefined}
            aria-haspopup="true"
            aria-label="RenamePipeline"
            onClick={event=> this.openPopover(event, true)}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary="Rename" />
          </MenuItem>
          <MenuItem
            aria-owns={open ? 'simple-popper' : undefined}
            aria-haspopup="true"
            aria-label="RenamePipeline"
            onClick={event=> this.openPopover(event, false)}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset primary="Delete" />
          </MenuItem>
        </Menu>
        <Popover
          id="create-form-popover"
          anchorEl={popoverAnchorEl}
          open={open}
          onClose={this.closePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {isEdit?
            <InputForm name={pipelineInEdit.name} onSave={this.handlePipelineUpdate} />:
            <div className={classes.deleteConfirmationContainer}>
              <Typography variant="subtitle1">Are you sure about this?</Typography>
              <Grid justify="center" className={classes.actionsContainer} container spacing={8}>
                <Grid item>
                  <Button size="small" onClick={this.handlePipelineDelete}>
                    Yes
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="small" onClick={this.closePopover}>
                    No
                  </Button>
                </Grid>
              </Grid>
            </div>
          }
        </Popover>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  appName: {
    padding: theme.spacing.unit * 2,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  link: {
    textDecoration: "none"
  },
  listItem: {
    "&:hover $listItemSecondaryAction": {
      visibility: "inherit"
    }
  },
  listItemSecondaryAction: {
    visibility: 'hidden'
  },
  deleteConfirmationContainer: {
    padding: 8
  },
  actionsContainer: {
    marginTop: 4
  }
});

function mapStateToProps(state: any) {
  const { pipelines } = state.pipelineReducer

  return {
    pipelines
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actionFetchPipelines: bindActionCreators(actionFetchPipelines, dispatch),
    actionSelectPipeline: bindActionCreators(actionSelectPipeline, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Pipelines));
