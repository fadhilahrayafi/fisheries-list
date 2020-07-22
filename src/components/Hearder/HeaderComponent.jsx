import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import './header.scss'

export const HeaderComponent = (props) => {
  const {children, addItemToggle, filterToggle} = props;

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.secondary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment>
    <CssBaseline />
    <AppBar color="inherit">
      <Toolbar>
      <IconButton edge="start" className="header-menu-button" color="inherit" aria-label="menu" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
        <StyledMenuItem onClick={() => addItemToggle(true)}>
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add item" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => filterToggle(true)}>
          <ListItemIcon>
            <FilterNoneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Filter" />
        </StyledMenuItem>
      </StyledMenu> 
        <Typography variant="h6">efishery</Typography>
        <div className="header-search">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <InputBase placeholder="Search…" classes="header-input" inputProps={{ 'aria-label': 'search' }} />
      </div>
      </Toolbar>
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
    <Container>
      <div className="header-title">
        <img src="https://i.pinimg.com/originals/36/38/f3/3638f3904da142cfb3ba89e9f55ed230.jpg" alt="fish" className="header-image" />
        <label className="header-text-title">List of Fish</label>
      </div>
    </Container>
    {children}
  </React.Fragment>
  )
}