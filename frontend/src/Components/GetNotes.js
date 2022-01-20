import { useEffect, useState } from 'react'
import axios from 'axios'
import react from 'react'
import Course from './Course'

export const GetNotes = () => {
    const [initialState, setInitialState] = useState([])

    useEffect(() => {
        fetch('/api/notes').then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
    }, [])
    console.log(initialState)

    return (
        <div>
            <div>
                {initialState.map((e, i) =>
                    <div key={e.noteId}>{e.noteId}</div>)}

            </div>
            <div>
                {initialState.map((e, i) =>
                    <div key={e.noteId}>{e.courseCode}</div>)}

            </div>
        </div>)
}

export default GetNotes