import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/OpenInNew'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function HideAppBar(props) {
  const classes = useStyles()
  const { newGameClick, aiEnabledChange, aiEnabledChecked } = props
  return (
    <div className={classes.root}>
    <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Choco Packets
            </Typography>
            <Typography variant="subtitle1">
              Opponent: 
              <FormControlLabel
                control={<Switch checked={aiEnabledChecked} onChange={aiEnabledChange} color="secondary"/>}
                label={aiEnabledChecked ? "AI" : "Human"}
              />
            </Typography>
            <Button color="inherit" onClick={newGameClick}>
                <Icon/>New Game
            </Button>
          </Toolbar>
        </AppBar>
    </div>
  );
}