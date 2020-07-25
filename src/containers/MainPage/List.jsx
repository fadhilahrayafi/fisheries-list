import React, { useState, useEffect } from 'react'
import SteinStore from 'stein-js-client'
import { ListData, PaginationMainPage, HeaderComponent, PopupComponent, AlertComponent, LoadingComponent } from '../../components'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import './mainPage.scss'
import Pagination from '@material-ui/lab/Pagination';

export const MainPage = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [sortNo, setSortNo] = useState(false);
  const [sortComodity, setSortComodity] = useState(false);
  const [sortProvince, setSortProvince] = useState(false);
  const [sortCity, setSortCity] = useState(false);
  const [sortSize, setSortSize] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const [sortDate, setSortDate] = useState(false);
  const [sortTime, setSortTime] = useState(false);
  const [popupAddStatus, setPopupAddStatus] = useState(false)
  const [popupFilterStatus, setPopupFilterStatus] = useState(false)
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertCondition, setAlertCondition] = useState("success")
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)


  const storeList = new SteinStore("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4")
  const listName = ["No", "Comodity", "Province Area", "City Area", "Size", "Price", "Parsed Date", "Time Stamp"]
  const listObjectKey = ["uuid", "komoditas", "area_provinsi", "area_kota", "size", "price", "tgl_parsed", "timestamp"]
  const listSort = [sortNo, sortComodity, sortProvince, sortCity, sortSize, sortPrice, sortDate, sortTime]
  const listSetSort = [setSortNo, setSortComodity, setSortProvince, setSortCity, setSortSize, setSortPrice, setSortDate, setSortTime]

  const fetchList = () => {
    setLoading(true)
    storeList.read("list", { limit: 10, offset: (page === 1 ? 1 : (page * 10)) })
      .then(data => {
        console.log(data)
        setList(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const getMaxPage = () => {
    storeList.read("list", {})
      .then(data => {
        setMaxPage(Math.ceil(data.length / 10))
        console.log(data.length)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    document.title = "fish list"
    fetchList()
    getMaxPage()
  }, [])

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "rgb(98,181,156)",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    table: {
      minWidth: 700,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles()

  const _onSorting = async ({ name, setSort, sortName, status }) => {
    // setSortNo(false)
    // setSortPrice(false)
    // setSortProvince(false)
    // setSortCity(false)
    // setSortComodity(false)
    // setSortSize(false)
    // setSortTime(false)
    if (name === 'No') {
      let temp = list.reverse();
      console.log(sortName)
      await setList([]);
      await setList(temp);
      await setSort(!status);
    } else {
      if (status) {
        let temp = list.sort((a, b) => {
          if (sortName === "komoditas"){
            if(a.komoditas === b.komoditas) return 0
            if(a.komoditas > b.komoditas) return -1
            if(a.komoditas < b.komoditas) return 1
          } 
          if (sortName === "area_provinsi"){
            if(a.area_provinsi === b.area_provinsi) return 0
            if(a.area_provinsi > b.area_provinsi) return -1
            if(a.area_provinsi < b.area_provinsi) return 1
          } 
          if (sortName === "area_kota"){
            if(a.area_kota === b.area_kota) return 0
            if(a.area_kota > b.area_kota) return -1
            if(a.area_kota < b.area_kota) return 1
          }
          if (sortName === "size") return (a.size) - (b.size)
          if (sortName === "price") return (a.price) - (b.price)
          if (sortName === "tgl_parsed") return (a.tgl_parsed) - (b.tgl_parsed)
          if (sortName === "timestamp") return (a.timestamp) - (b.timestamp)

        })
        console.log("sort", temp[0], sortName)
        await setList([]);
        await setList(temp);
        await setSort(!status);
      } else {
        let temp = list.sort((a, b) => {
          if (sortName === "komoditas"){
            if(a.komoditas === b.komoditas) return 0
            if(a.komoditas < b.komoditas) return -1
            if(a.komoditas > b.komoditas) return 1
          } 
          if (sortName === "area_provinsi"){
            if(a.area_provinsi === b.area_provinsi) return 0
            if(a.area_provinsi < b.area_provinsi) return -1
            if(a.area_provinsi > b.area_provinsi) return 1
          } 
          if (sortName === "area_kota"){
            if(a.area_kota === b.area_kota) return 0
            if(a.area_kota < b.area_kota) return -1
            if(a.area_kota > b.area_kota) return 1
          }
          if (sortName === "size") return (b.size) - (a.size)
          if (sortName === "price") return (b.price) - (a.price)
          if (sortName === "tgl_parsed") return (b.tgl_parsed) - (a.tgl_parsed)
          if (sortName === "timestamp") return (b.timestamp) - (a.timestamp)


        })
        console.log("sort", temp[0], sortName)
        await setList([]);
        await setList(temp);
        await setSort(!status);
      }
    }
  }

  const SortingListTable = ({ name, status, active, setSort, sort }) => (
    <label className={`name-table`} onClick={() => _onSorting({ name, setSort, sortName: sort, status })} style={active ? { textAlign: 'center', justifyContent: 'center' } : {}}>
      <span className='sorting'>
        {!active
          && <>
            <span className={`${status ? '' : 'nonactive'}`}>&and;</span>
            <span className={`${!status ? '' : 'nonactive'}`}>&or;</span>
          </>}
      </span>
      {name}
    </label>
  )

  return (
    <>
      <HeaderComponent addItemToggle={setPopupAddStatus} filterToggle={setPopupFilterStatus} store={storeList} setList={setList} fetchList={fetchList} setAlert={setAlertStatus} setAlertStatus={setAlertCondition} setAlertMessage={setMessage} setLoading={setLoading}>
        {popupFilterStatus ? <PopupComponent open={popupFilterStatus} close={() => setPopupFilterStatus(false)} storeList={storeList} type={"filter"} title={"Filter"} setList={setList} fetchList={fetchList} setStatusAlert={setAlertStatus} setMessage={setMessage} setLoading={setLoading} setAlertCondition={setAlertCondition} /> : null}
        {popupAddStatus ? <PopupComponent open={popupAddStatus} close={() => setPopupAddStatus(false)} storeList={storeList} type={"add"} title={"Add New Comodity"} setList={setList} fetchList={fetchList} setStatusAlert={setAlertStatus} setMessage={setMessage} setLoading={setLoading} setAlertCondition={setAlertCondition} /> : null}
        {loading ? <LoadingComponent open={loading} setOpen={setLoading} /> : null}
        <Container maxWidth="lg">
          {alertStatus ? <AlertComponent message={message} open={alertStatus} setOpen={setAlertStatus} status={alertCondition} /> : null}
          <div className="header-title">
            <label className="header-text-title">List of Fish</label>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell ><SortingListTable status={sortNo} name={"No"} setSort={setSortNo} sort={"No"} /></StyledTableCell>
                  <StyledTableCell ><SortingListTable status={sortComodity} name={"Comodity"} setSort={setSortComodity} sort={"komoditas"} /></StyledTableCell>
                  <StyledTableCell ><SortingListTable status={sortProvince} name={"Province"} setSort={setSortProvince} sort={"area_provinsi"} /></StyledTableCell>
                  <StyledTableCell ><SortingListTable status={sortCity} name={"City"} setSort={setSortCity} sort={"area_kota"} /></StyledTableCell>
                  <StyledTableCell ><SortingListTable status={sortSize} name={"Size"} setSort={setSortSize} sort={"size"} /></StyledTableCell>
                  <StyledTableCell ><SortingListTable status={sortPrice} name={"Price"} setSort={setSortPrice} sort={"price"} /></StyledTableCell>
                  <StyledTableCell ><SortingListTable status={sortDate} name={"Date Parsed"} setSort={setSortDate} sort={"tgl_parsed"} /></StyledTableCell>
                  <StyledTableCell ><SortingListTable status={sortTime} name={"Time Stamp"} setSort={setSortTime} sort={"timestamp"} /></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((item, index) => {
                  return <ListData item={item} key={index} index={index + (page * 10)} />
                })}
              </TableBody>
            </Table>
          </TableContainer>
            <PaginationMainPage page={page} setPage={setPage} maxPage={maxPage} fetchList={fetchList}/>
        </Container>
      </HeaderComponent>
    </>
  )
}