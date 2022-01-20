import { useEffect, useState } from 'react'
import axios from 'axios'
import react from 'react'
import Course from './Course'

export const GetCourses = () => {
    const [initialState, setInitialState] = useState([])

    useEffect(() => {
        fetch('/api/courses').then(res => {
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
                    <div key={e.courseId}>{e.courseId}</div>)}

            </div>
            <div>
                {initialState.map((e, i) =>
                    <div key={e.courseId}>{e.name}</div>)}

            </div>
        </div>)
}

export default GetCourses