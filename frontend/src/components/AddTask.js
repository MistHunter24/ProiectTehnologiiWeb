import React from 'react'
import { useState } from 'react'


const AddTask = ({ onAdd }) => {
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!code || code === "")
            alert('Please fill code!')
        else if (!name)
            alert('Please fill name!')
        else if (name.length > 20)
            alert('Name larger than 20 characters!')
        else if (!title)
            alert('Please fill title!')
        else if (title.length > 20)
            alert('Title larger than 20 characters!')
        else if (!body)
            alert('Please fill body!')
        else if (body.length > 250)
            alert('Body larger than 250 characters!')
        // if (!code || !name || !title || !body) {
        //     alert('Please fill all forms!')
        //     return
        // }

        onAdd({ code, name, title, body })

        setCode('')
        setName('')
        setTitle('')
        setBody('')
    }

    return (
        <form
            className='add-form'
            onSubmit={onSubmit}>
            <div
                className='form-control'>
                <label >Course Code</label>
                <input
                    type='number'
                    placeholder='Course Code'
                    value={code}
                    onChange={(e) => setCode(e.target.value)} />
            </div>
            <div
                className='form-control'>
                <label>Course Name</label>
                <input
                    type='text'
                    placeholder='Course Name'
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div
                className='form-control'>
                <label>Note Title</label>
                <input
                    type='text'
                    placeholder='Note Title'
                    value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div
                className='form-control'>
                <label>Note Body</label>
                <input
                    type='text'
                    placeholder='Note Body'
                    value={body}
                    onChange={(e) => setBody(e.target.value)} />
            </div>
            <input
                className='btn btn-block'
                type='submit'
                value='Save Task' />
        </form>
    )
}

export default AddTask
