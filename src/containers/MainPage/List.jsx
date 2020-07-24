import React, {useState, useEffect} from 'react'
import SteinStore from 'stein-js-client'
import {ListData, PaginationMainPage, HeaderComponent, PopupComponent, AlertComponent} from '../../components'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';


export const MainPage = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(0)
    const [popupAddStatus, setPopupAddStatus] = useState(false)
    const [popupFilterStatus, setPopupFilterStatus] = useState(false)
    const [alertStatus, setAlertStatus] = useState(false)
    const [message, setMessage] = useState(null)

    const storeList = new SteinStore("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4")
    const listName = ["No.", "Comodity", "Province Area", "City Area", "Size", "Price", "Parsed Date", "Time Stamp"]

    const fetchList = () => {
        storeList.read("list", {limit:10, offset:(page === 0 ? 0 : (page * 10) + 1)})
        .then(data => {
            console.log(data)
            setList(data)
        })
        .catch(err => console.log(err))
    }

    useEffect (()=> {
        document.title="fish list"
        fetchList()
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

    return (
        <>
        <HeaderComponent addItemToggle={setPopupAddStatus} filterToggle={setPopupFilterStatus} store={storeList} setList={setList} fetchList={fetchList}>
        {popupFilterStatus ? <PopupComponent open={popupFilterStatus} close={() => setPopupFilterStatus(false)} storeList={storeList} type={"filter"} title={"Filter"} setList={setList} fetchList={fetchList} setStatusAlert={setAlertStatus} setMessage={setMessage}/> : null}
        {popupAddStatus ? <PopupComponent open={popupAddStatus} close={() => setPopupAddStatus(false)} storeList={storeList} type={"add"} title={"Add New Comodity"} setList={setList} fetchList={fetchList} setStatusAlert={setAlertStatus} setMessage={setMessage}/> : null}
        <Container maxWidth="lg">
        {alertStatus ? <AlertComponent message={message} open={alertStatus} setOpen={setAlertStatus} status={"success"}/> : null}

          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                  <TableRow>
                      {listName.map((name, index) => {
                          return (
                          <StyledTableCell key={index}>{name}</StyledTableCell>
                          )
                      })}
                  </TableRow>
                  </TableHead>
                  <TableBody>
                      {list.map((item, index) => {
                          return <ListData item={item} key={index} index={page === 0 ? index : (index + (page * 10))}/>
                      })}
                  </TableBody>
              </Table>
          </TableContainer>
          <PaginationMainPage/>
        </Container>
        </HeaderComponent>
        </>
    )
}