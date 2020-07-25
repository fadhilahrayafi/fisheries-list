import React, {useState} from 'react';
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
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import './header.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const HeaderComponent = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const {children, addItemToggle, filterToggle, setList, store, fetchList, setAlert, setAlertStatus, setAlertMessage, setLoading} = props;

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

  const fetchSearch = (keyCode) => {
    if(keyCode === 13) { 
      let search = searchValue.replace(/^[ ]+|[ ]$/g,'');
      if(search) {
        setLoading(true)
        store.read("List", { search: { komoditas: search } }).then(data => {
          console.log(data, search);
          setLoading(false)
          if(data.length > 0){
            setSearchValue("")
            setList(data)
          } else {
            setAlert(true)
            setSearchValue("")
            setAlertStatus("error")
            setAlertMessage("Data not found!")
          }
        });
      }
    } 
  }

  function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }


  return (
    <React.Fragment>
    <CssBaseline />
    <AppBar color="inherit" >
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
        <div className="header-main-menu">
          <Typography variant="h6" onClick={() => {fetchList(); setSearchValue("")}} className="header-text-logo">efishery</Typography>
          <div className="header-search">
            <div className="search-icon">
            <SearchIcon />
            </div>
            <InputBase placeholder="Search by comodity…" classes="header-input" inputProps={{ 'aria-label': 'search' }} value={searchValue} onChange={({ target: { value } }) => setSearchValue(value)} onKeyUp={( { keyCode }) => fetchSearch( keyCode ) }/>
          </div>

        </div>
      </Toolbar>
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
    <Container>
    <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
    {children}
  </React.Fragment>
  )
}