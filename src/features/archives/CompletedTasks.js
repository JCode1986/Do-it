import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

function CompletedTasks(props) {
    const db = firebase.firestore();

    const [archive, setArchive] = useState([])

    useEffect(() => {
        db.collection('archive').onSnapshot(snapshot => {
            //returns object with id, and todo
            setArchive(snapshot.docs.map(doc => ({
                id: doc.id, 
                archivedTodo: doc.data().archivedTodo,
                archivedDescription: doc.data().archivedDescription,
                archivedDateCreated: doc.data().archivedDateCreated,
                archivedDateDeadline: doc.data().archivedDateDeadline,
                archivedModifiedDate: doc.data().archivedModifiedDate,
                archivedPriorityLevel: doc.data().archivedPriorityLevel
            })))
        })
        }, [])


     console.log(archive, "what is this?")
    return (
        <div>
            <p>Completed tasks</p>
        </div>
    )
}

export default withRouter(CompletedTasks)
