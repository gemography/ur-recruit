import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  Grid,
  Theme,
  Button
} from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  title: string,
  subTitle: string,
  ctaTitle: string,
  icon: any,
  onAction: (event: any) => void,
}

class EmptyState extends React.Component<Props> {
  render(): React.ReactNode {
    const { classes, title, subTitle, ctaTitle, icon, onAction } = this.props;

    return (
      <Grid container spacing={40}>
        <Grid item>
          <Typography color="inherit" variant="h4" className={classes.title}>
            { title }
          </Typography>
          <Typography color="inherit" variant="h5" className={classes.subTitle}>
            { subTitle }
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={onAction}>
            { ctaTitle }
          </Button>
        </Grid>
        <Grid item className={classes.icon}>
          { icon }
        </Grid>
      </Grid>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    margin: theme.spacing.unit * 4,
    marginTop: 0
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing.unit
  },
  subTitle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing.unit * 3
  },
  icon: {
    "& svg": {
      fontSize: 512,
      marginTop: -128,
      color: "hsl(0, 0%, 88%)"
    }
  }
});

export default withStyles(styles)(EmptyState);
