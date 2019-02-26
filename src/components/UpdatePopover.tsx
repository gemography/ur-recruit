import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Popover,
  Theme
} from '@material-ui/core';
import InputForm from './InputForm';

interface Props extends WithStyles<typeof styles> {
  parentAnchorEl: any;
  value?: string;
  onSave: (value: string) => void;
  onClose: () => void;
}

class UpdatePopover extends React.Component<Props> {
  render(): React.ReactNode {
    const { value , parentAnchorEl, onClose, onSave } = this.props;
    const open = Boolean(parentAnchorEl);

    return (
      <Popover
        id="create-form-popover"
        anchorEl={parentAnchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <InputForm value={value} onSave={onSave} />
      </Popover>
    );
  }
}

const styles = (theme: Theme) => createStyles({});

export default withStyles(styles)(UpdatePopover);
