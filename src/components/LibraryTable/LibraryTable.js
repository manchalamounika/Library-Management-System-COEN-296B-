import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { runInDebugContext } from 'vm';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { relative } from 'path';
import EditIcon from '@material-ui/icons/Create';
import classes from './LibraryTable.css';
import Modal from '../UI/Modal/Modal';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(103,112,119)',
    color: theme.palette.common.white,
    'text-align':'center',
    'z-index':100,
  },
  body: {
    fontSize: 14,
    'text-align':'center',
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '90%',
    margin: '10px auto',
    marginTop: '40px',
    overflowX: 'auto',
    'line-height': '35px',
    'box-sizing': 'border-box',
    'vertical-align':'middle',
  },
  
  deleteicon:{
    'vertical-align':'middle'
 },
  row: {
    '&:hover': {
      backgroundColor:'rgba(181,181,183,0.8)'
      },
  },
  button: {
    display :'inline-block',
    color:'white',
    position :'relative',
    float:'left',
    width: '35px',
    height:'35px'
  }, 
});

function editbuttonclicked(props){
console.log('edit button clicked');
console.log(props);
//return(
//<Libraryform library={this.state.libraries}/>
//);
}

function CustomizedTable(props) {
  console.log(props);
 /*  const { classes } = props; */
  const rows = props.rows;
  console.log(rows);
  return (
    <section>
    <div className={classes.container}>
    <table>
      <thead>
        <tr className={classes.header}>
          <th>
            Table attribute name
            <div>Library Name</div>
          </th>
          <th>
            Value
            <div>Library Village</div>
          </th>
          <th>
            Description
            <div>Library Country</div>
          </th>
        </tr>
      </thead>
      <tbody>
      {rows.map(row => {
          console.log(row);
          return (
          <tr className={classes.row} key={row.id}>
          <td component="th" scope="row">
          <IconButton className={classes.button} aria-label="Delete" onClick={editbuttonclicked}>
          <EditIcon className ={classes.deleteicon}/>
          </IconButton><IconButton className={classes.button} aria-label="Delete">
          <DeleteIcon className ={classes.deleteicon}/>
          </IconButton>
          {row.libraryname}
          </td>
          <td>{row.libraryvillage}</td>
          <td>{row.librarycountry}</td>
          </tr>);})}
      </tbody>
    </table>
  </div>
  </section>
/*     <Paper className={classes.root} style={{height: '410px'}}>
      <Table>
        <thead style={{display: 'table'}}>
        <tr style={{backgroundColor:'rgba(37,40,57)',position: 'relative',display:'block'}}>
            <CustomTableCell style={{textAlign:'center'}} >Library Name</CustomTableCell>
            <CustomTableCell style={{textAlign:'center'}} >Library Village</CustomTableCell>
            <CustomTableCell style={{textAlign:'center'}} >Library Country</CustomTableCell>
        </tr>
        </thead>
        <TableHead className={classes.head} >
          <TableRow >
            <CustomTableCell className = {classes.firsthead}>Library Name</CustomTableCell>
            <CustomTableCell>Library Village</CustomTableCell>
            <CustomTableCell>Library Country</CustomTableCell>
          </TableRow>
        </TableHead> 
        <TableBody style ={{display:'block',overflow:'auto', height:'400px',width:'100%'}}>
          {rows.map(row => {
          console.log(row);
          return (
          <TableRow className={classes.row} key={row.id}>
          <CustomTableCell component="th" scope="row">
          <IconButton className={classes.button} aria-label="Delete">
          <EditIcon className ={classes.deleteicon}/>
          </IconButton><IconButton className={classes.button} aria-label="Delete">
          <DeleteIcon className ={classes.deleteicon}/>
          </IconButton>
          {row.libraryname}
          </CustomTableCell>
          <CustomTableCell>{row.libraryvillage}</CustomTableCell>
          <CustomTableCell>{row.librarycountry}</CustomTableCell>
          </TableRow>);
          })}
        </TableBody>
        </Table>
    </Paper> */
  );
}
CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CustomizedTable);
