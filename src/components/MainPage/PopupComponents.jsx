import React, {useState, useEffect} from 'react';
import {getUUID} from '../../helpers'
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
      display:'flex',
      flexDirection:'column',
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

export const PopupComponent = (props) => {
  const classes = useStyles();
  const {title, open, close, type, storeList, setList, fetchList} = props

  const [sizeList, setSizeList] = useState([])
  const [proviceList, setProvinceList] = useState([])
  const [cityList, setCityList] = useState([])
  const [komoditas, setKomoditas] = useState(null)
  const [provinsi, setProvinsi] = useState(null)
  const [kota, setKota] = useState(null)
  const [size, setSize] = useState(null)
  const [price, setPrice] = useState(null)

  const fetchListSize = () => {
    storeList.read('option_size', {})
    .then(data => {
      let tempData = []
      data.forEach(el=> {
        tempData.push(el.size)
      });
      setSizeList(tempData)
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
    })
    .catch(err => console.log(err))
  }

  const addNew = () => {
    storeList.append("list", [
      {
        uuid: getUUID(),
        komoditas,
        area_provinsi: provinsi,
        area_kota: kota,
        size,
        price
      }
    ])
    .then(res => {
      console.log(res)
      fetchList()
      close()
      setKomoditas(null)
      setProvinsi(null)
      setKota(null)
      setSize(null)
      setPrice(null)
    })
    .catch(err => console.log(err))
  }

  const filterList = () => {
    let keySearch = []
    let valueSearch = []
    if(provinsi) {keySearch.push("area_provinsi"); valueSearch.push(provinsi)}
    if(kota) {keySearch.push("area_kota"); valueSearch.push(kota)}
    if(size) {keySearch.push("size"); valueSearch.push(size)}
    let inputSearch = {}
    keySearch.forEach((key, i) => {
      inputSearch[key] =  valueSearch[i]
    })
    storeList.read("List", {search: inputSearch, limit: 10})
    .then(data => {
      setList(data)
      close()
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  useEffect (()=> {
    fetchListSize()
    fetchArea()
    setKomoditas(null)
    setProvinsi(null)
    setKota(null)
    setSize(null)
    setPrice(null)
}, [])

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
              {type === "filter" ? (
                <>
                <div className="popup-filter">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-native-select">Size</InputLabel>
                      <Select native defaultValue="" id="grouped-native-select" value={size} onChange={({ target: { value } }) => setSize(value)}>
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
                      <Select native defaultValue="" id="grouped-native-select" value={provinsi} onChange={({ target: { value } }) => setProvinsi(value)} >
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
                      <Select native defaultValue="" id="grouped-native-select" value={kota} onChange={({ target: { value } }) => setKota(value)} >
                        <option aria-label="None" value="" />
                        {cityList.map((city, index) => {
                          return (
                            <option value={city} key={index}>{city}</option>
                          )
                        })}
                      </Select>
                  </FormControl>
              </div>
              <div className="button-submit" >
                <Button variant="contained" color="secondary" disableElevation onClick={() => filterList()}>
                    Submit
                </Button>
            </div>
            </>
              ):(

                <>
                 <form className={classes.root} noValidate autoComplete="off">
                   <div className="popup-component-input">
                    <TextField
                        required
                        id="outlined-required"
                        label="Comodity"
                        variant="outlined"
                        InputLabelProps={{
                        shrink: true
                        }}
                        value={komoditas}
                        onChange={({ target: { value } }) => setKomoditas(value)} 
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
                      value={price}
                      onChange={({ target: { value } }) => setPrice(value)} 
                      />
                   </div>
                   <div className="popup-component-input">
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
                      <TextField
                      required
                      id="outlined-required"
                      label="Time stamp"
                      type="time"
                      variant="outlined"
                      InputLabelProps={{
                      shrink: true,
                      }}
                      />
                   </div>
                  
                   <div className="popup-component-input">
                   <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-native-select">Size</InputLabel>
                      <Select native defaultValue="" id="grouped-native-select" value={size} onChange={({ target: { value } }) => setSize(value)} >
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
                      <Select native defaultValue="" id="grouped-native-select" value={provinsi}  onChange={({ target: { value } }) => setProvinsi(value)}>
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
                      <Select native defaultValue="" id="grouped-native-select" value={kota}  onChange={({ target: { value } }) => setKota(value)}>
                        <option aria-label="None" value="" />
                        {cityList.map((city, index) => {
                          return (
                            <option value={city} key={index}>{city}</option>
                          )
                        })}
                      </Select>
                  </FormControl>
                   </div>
                  
                
              
            </form>
            <div className="button-submit" onClick={() => addNew()}>
                <Button variant="contained" color="secondary" disableElevation>
                    Submit
                </Button>
            </div>
                </>
              )}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

