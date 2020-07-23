import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {formatTime, formatMoney} from '../../helpers'
import { keys } from '@material-ui/core/styles/createBreakpoints';

export const ListData = ({item, index}) => {
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
        }))(TableCell);
        
    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            },
        },
        }))(TableRow);

    return (
    <StyledTableRow>
        <StyledTableCell>{index + 1}</StyledTableCell>
        {/* <StyledTableCell>{item.uuid ? item.uuid : "-"}</StyledTableCell> */}
        <StyledTableCell style={{fontStyle:"italic"}}>{item.komoditas ? item.komoditas : "-"}</StyledTableCell>
        <StyledTableCell>{item.area_provinsi ? item.area_provinsi : "-"}</StyledTableCell>
        <StyledTableCell>{item.area_kota ? item.area_kota : "-"}</StyledTableCell>
        <StyledTableCell>{item.size ? item.size + " cm": "-"}</StyledTableCell>
        <StyledTableCell>{item.price ? formatMoney(Number(item.price)): "-"}</StyledTableCell>
        <StyledTableCell>{item.tgl_parsed ? item.tgl_parsed.toLocaleString() : "-"}</StyledTableCell>
        <StyledTableCell>{item.timestamp ? formatTime(Number(item.timestamp)) : "-"}</StyledTableCell>
    </StyledTableRow>
    )
}