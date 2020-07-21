import React, {useState, useEffect} from 'react'
import SteinStore from 'stein-js-client'
import {ListData} from '../../components'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export const MainPage = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)

    
    const listName = ["Komoditas", "Area Provinsi", "Area Kota", "Size", "Price", "Tanggal Parsed", "Timestamp"]

    const fetchList = () => {
        const storeList = new SteinStore("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4")
        storeList.read("list", {limit: page * 10, offset: 0 + ((page * 10) + 1)})
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
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);

      const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
      });
      
      const classes = useStyles()


    return (
        <>
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
                        return <ListData item={item} key={index}/>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}