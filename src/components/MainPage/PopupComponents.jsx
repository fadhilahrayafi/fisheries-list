import React, {useState, useEffect} from 'react';
import SteinStore from 'stein-js-client'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './mainpageComp.scss'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:"70%"
  },
  root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '90%',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      width: "30%",
    },
    
}));

export const Popup = (props) => {
  const classes = useStyles();
  const {title, open, close, children} = props
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export const PopupAdd = ({open, handleClose}) => {
  const classes = useStyles();
  return (
    <Popup open={open} close={handleClose} title="Add new Item">
       <form className={classes.root} noValidate autoComplete="off">
            <TextField
                required
                id="outlined-required"
                label="Comodity"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                />
                <TextField
                required
                id="outlined-required"
                label="Province Area"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                />
                <TextField
                required
                id="outlined-required"
                label="City Area"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                />
                <TextField
                required
                id="outlined-required"
                label="Size"
                type="number"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                />
                <TextField
                required
                id="outlined-required"
                label="Price"
                type="number"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                />
                <TextField
                required
                id="outlined-required"
                label="Parsed Date"
                type="date"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
                />
            </form>
            <div className="button-submit">
                <Button variant="contained" color="secondary" disableElevation>
                    Submit
                </Button>
            </div>
    </Popup>        
  );
}

export const PopupFilter = ({open, close}) => {
  const classes = useStyles();
  const [sizeList, setSizeList] = useState([])
  const [proviceList, setProvinceList] = useState([])
  const [cityList, setCityList] = useState([])
  const storeList = new SteinStore("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4")


  const fetchListSize = () => {
    storeList.read('option_size', {})
    .then(data => {
      let tempData = []
      data.forEach(el=> {
        tempData.push(el.size)
      });
      setSizeList(tempData)
      console.log("sized", sizeList)
    })
    .catch(err => console.log(err))
  }

  const fetchArea = () => {
    storeList.read('option_area', {})
    .then(data => {
      let tempProvince = []
      let tempCity = []
      data.forEach(area => {
        area.city && tempCity.push(area.city) 
        area.province && tempProvince.push(area.province)
      })
      setCityList(tempCity)
      setProvinceList(tempProvince)
      console.log("area", data)
    })
    .catch(err => console.log(err))
  }

  useEffect (()=> {
    fetchListSize()
    fetchArea()
}, [])

  return (
    <Popup open={open} close={close} title="Filter">
      <div className="popup-filter">
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Size</InputLabel>
          <Select native defaultValue="" id="grouped-native-select">
            <option aria-label="None" value="" />
            {sizeList.map((size, index) => {
              return (
                <option value={size} key={index}>{size} cm</option>
              )
            })}
          </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Province</InputLabel>
          <Select native defaultValue="" id="grouped-native-select">
            <option aria-label="None" value="" />
            {proviceList.map((province, index) => {
              return (
                <option value={province} key={index}>{province}</option>
              )
            })}
          </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">City</InputLabel>
          <Select native defaultValue="" id="grouped-native-select">
            <option aria-label="None" value="" />
            {cityList.map((city, index) => {
              return (
                <option value={city} key={index}>{city}</option>
              )
            })}
          </Select>
      </FormControl>
    </div>
    <div className="button-submit">
        <Button variant="contained" color="secondary" disableElevation>
            Submit
        </Button>
    </div>
    </Popup>
  )
} 