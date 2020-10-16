import React, { useState, useEffect, useContext } from 'react'
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../authentication/Auth';
import { TodoContext } from '../context/TodoContext';
import { makeStyles } from '@material-ui/core/styles';
import { priorityToString } from '../priority/priorityFunctions';
import Loading from '../loading/Loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import dateFormat from '../date/DateFormat';
import CompletedDetails from './CompletedDetails';
import './CompletedTasks.css'


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })

function CompletedTasks() {
    const db = firebase.firestore();
    const { currentUser } = useContext(AuthContext);
    const userArchive = db.collection('users').doc(currentUser.uid).collection('archive');
    const {  isPending, setIsPending } = useContext(TodoContext);
    const classes = useStyles();

    const [archives, setArchives] = useState([]);
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };


    useEffect(() => {
      //setIsPending(true);
      userArchive.orderBy('archivedCompleted', 'desc').onSnapshot(snapshot => {
            //returns object with id, and todo
        setArchives(snapshot.docs.map(doc => ({
            id: doc.id, 
            archivedTodo: doc.data().archivedTodo,
            archivedDescription: doc.data().archivedDescription,
            archivedDateCreated: doc.data().archivedDateCreated,
            archivedCompleted: doc.data().archivedCompleted,
            archivedDateDeadline: doc.data().archivedDateDeadline,
            archivedModifiedDate: doc.data().archivedModifiedDate,
            archivedPriorityLevel: doc.data().archivedPriorityLevel
        })))
        //setIsPending(false);
      })
    }, [db, userArchive])
        
    //find id
    const details = (id) => {
        setIsModalOpen(true);
        setDescription(archives.find((archive) => archive.id === id).archivedDescription);
    }

    if(isPending) return <Loading/>

    return (
        <>
        <CompletedDetails
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            archives={archives}
            details={details}
            description={description}
        />
        <Typography style={{marginTop:'40px', fontWeight:'bold', fontSize:'26px'}}>
          Archive
        </Typography>
        <Typography>
          <em>
          Completed: {archives.length}
          </em>
        </Typography>
        <TableContainer component={Paper} style={{marginTop: '20px'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Created</TableCell>
              <TableCell align="center">Deadline</TableCell>
              <TableCell align="center">Completed</TableCell>
              <TableCell align="center">Priority Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((archive) => (
                <TableRow 
                key={archive.id}
                onClick={() => details(archive.id)}
                style={{cursor:'pointer'}}
                >
                <TableCell 
                    component="th" 
                    align="center" 
                    scope="row"
                >
                  {archive.archivedTodo}
                </TableCell>
                <TableCell align="center">{dateFormat(archive.archivedDateCreated.toDate().toString())}</TableCell>
                <TableCell align="center">{dateFormat(archive.archivedDateDeadline.toDate().toString())}</TableCell>
                <TableCell align="center">{dateFormat(archive.archivedCompleted.toDate().toString())}</TableCell>
                <TableCell align="center">{priorityToString(archive.archivedPriorityLevel)}</TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={archives.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </>
    )
}

export default withRouter(CompletedTasks)
