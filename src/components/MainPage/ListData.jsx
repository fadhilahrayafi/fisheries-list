import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const ListData = ({item}) => {
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
        <StyledTableCell>{item.komoditas}</StyledTableCell>
        <StyledTableCell>{item.area_provinsi}</StyledTableCell>
        <StyledTableCell>{item.area_kota}</StyledTableCell>
        <StyledTableCell>{item.size}</StyledTableCell>
        <StyledTableCell>{item.price}</StyledTableCell>
        <StyledTableCell>{item.tgl_parsed}</StyledTableCell>
        <StyledTableCell>{item.timestamp}</StyledTableCell>
    </StyledTableRow>
    )
}