import { useEffect, useState, useRef } from 'react';
import fetchTodos from '../../data/todos';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './Todo.css'

const initItemsPerPage = 5
const initOnlyWaiting = false


function Todo() {
    // todosRaw -> filters -> todos -> display
    // read todoRaw
    const [todosRaw, setTodosRaw] = useState([])
    // filters (bypass)
    const [onlyWaiting, setonlyWaiting] = useState([])
    const [itemPerPage, setitemPerPage] = useState([])

    // todos
    const [todos, setTodos] = useState([])
    // display
    const [numPages, setNumPages] = useState(0)
    const [curPages, setcurPages] = useState(0)
    const itemsPerPageRef = useRef()
    const onlyWaitingRef = useRef()

    // modal handlers
    const [show, setShow] = useState(false);

    const idRef = useRef()
    const titleRef = useRef()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setTodosRaw(fetchTodos())
        setonlyWaiting(initOnlyWaiting)
        itemsPerPageRef.current.value = initItemsPerPage
        setitemPerPage(initItemsPerPage)
        onlyWaitingRef.current.checked = initOnlyWaiting
    }, []) //load

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter(todo => !todo.completed))
        }
        else {
            setTodos(todosRaw)
        }
    }, [todosRaw, onlyWaiting])

    useEffect(() => {
        setNumPages(Math.ceil(todos.length / itemPerPage))
    }, [itemPerPage, todos.length])

    useEffect(() => {
        if (numPages <= 0) setcurPages(0)
        else if (curPages === 0) setcurPages(1)
        else if (curPages > numPages) setcurPages(numPages)
    }, [numPages])

    // eventhandler
    function deleteClick(id) {
        setTodosRaw(todosRaw.filter(todo => todo.id !== id))
    }

    function waitingClick(id) {
        const todoSelected = todosRaw.find(todo => todo.id === id)

        todoSelected.completed = true

        // setTodosRaw(todosRaw) // doesn't work, state is not changed.
        setTodosRaw([...todosRaw])
    }

    function addClick(id, title) {
        const newTodo = {
            userID: 1,
            id: id,
            title: title,
            completed: false,
        }
        //todosRaw.push(newTodo) // doesn't work, state is not changed.

        setTodosRaw([...todosRaw, newTodo]) //ok
    }

    return (
        <div className='todo-container'>
            {/* modals */}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                value={Number(todosRaw.reduce((prev, todo) => {
                                    return prev < todo.id ? todo.id : prev
                                }, 0)) + 1}
                                disabled
                                ref={idRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={titleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel&nbsp;
                        <span className='bi bi-x-lg'></span>
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const id = idRef.current.value
                        const title = titleRef.current.value.trim()
                        if (title === '') {
                            alert('Title cannot be empty')
                            titleRef.current.value = ''
                            titleRef.current.focus()
                        }
                        else {
                            addClick(id, title)
                            handleClose()
                        }
                    }}>
                        Add&nbsp;
                        <span className='bi bi-plus-lg'></span>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* filters */}

            <div className='todo-filters-container'>
                <div className='form-check form-switch d-flex align-items-center'>
                    <input className='form-check-input me-2' type="checkbox" role='switch' id='flexSwitchCheckDefault'
                        onClick={(e) => {
                            setonlyWaiting(e.target.checked)
                        }}
                        ref={onlyWaitingRef}
                    />
                    <label className='form-check-label d-flex align-items-center' htmlFor='flexSwitchCheckDefault'>
                        Show only&nbsp;
                        <button className='btn btn-warning'>
                            Waiting&nbsp;
                            <span className='bi bi-clock'></span>
                        </button>
                    </label>
                </div>
                <select className='form-select'
                    aria-label='Default select excample'
                    style={{ width: '200px' }}
                    defaultValue={5}
                    onChange={(e) => { setitemPerPage(e.target.value) }}
                    ref={itemsPerPageRef}>
                    <option value={5}>5 items per page</option>
                    <option value={10}>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </select>
            </div>




            {/* table */}

            <table className='table table-striped todo-table'>
                <thead className='table-dark'>
                    <tr>
                        <th style={{ width: '10%' }} valign='middle'>ID</th>
                        <th valign='middle'>Title</th>
                        <th style={{ textAlign: 'right', width: '20%' }} valign='middle'>Completed&nbsp;
                            <button className='btn btn-primary' onClick={handleShow}>
                                <span className='bi bi-plus-lg'></span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        // itemPerPage = 5
                        // curPages = 1,2
                        // items (human) => ( 1, ..., 5 )
                        // items (js*) => ( 0, ..., 4 ), ( 5, ..., 9 )
                        // item (js*) => ( min, ..., max )
                        // min = (curPages - 1) * itemPerPage
                        // max = curPages * itemPerPage - 1

                        todos.filter((todo, index) => {
                            const min = (curPages - 1) * itemPerPage
                            const max = curPages * itemPerPage - 1
                            return index >= min && index <= max
                        })
                            .map((todo) => {
                                return (
                                    <tr key={todo.id}>
                                        <td valign='middle'>
                                            <span className='badge bg-secondary'
                                                style={{ width: '2rem' }}>
                                                {todo.id}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'left' }} valign='middle'>{todo.title}</td>
                                        <td style={{ textAlign: 'right' }} valign='middle'>
                                            {todo.completed ? (
                                                <span className='badge bg-success'>
                                                    done&nbsp;
                                                    <span className='bi bi-check'></span>
                                                </span>
                                            ) : (
                                                <button className='btn btn-warning'
                                                    onClick={() => waitingClick(todo.id)}>
                                                    waiting&nbsp;
                                                    <span className='bi bi-clock'></span>
                                                </button>
                                            )}
                                            <button className='btn btn-danger'
                                                onClick={() => deleteClick(todo.id)}>
                                                <span className='bi bi-trash'></span>
                                            </button>
                                        </td>
                                    </tr>)
                            })}

                </tbody>
            </table>

            {/* page control */}
            <div>
                <button
                    className={
                        'todo-spacing btn ' +
                        (curPages <= 1 ? 'btn-outline-secondary' : 'btn-outline-primary')
                    }
                    onClick={() => {
                        setcurPages(1)
                    }}
                    disabled={curPages <= 1}
                >
                    First
                </button>
                <button
                    className={
                        'todo-spacing btn ' +
                        (curPages <= 1 ? 'btn-outline-secondary' : 'btn-outline-primary')
                    }
                    onClick={() => curPages > 1 && setcurPages(curPages - 1)}
                    disabled={curPages <= 1}
                >
                    Previous
                </button>
                <span className='todo-spacing'>
                    {curPages}&nbsp;/&nbsp;{numPages}
                </span>
                <button
                    className={
                        'todo-spacing btn ' +
                        (curPages >= numPages
                            ? 'btn-outline-secondary'
                            : 'btn-outline-primary')
                    }
                    onClick={() => curPages < numPages && setcurPages(curPages + 1)}
                    disabled={curPages >= numPages}
                >
                    Next
                </button>
                <button
                    className={
                        'todo-spacing btn ' +
                        (curPages >= numPages
                            ? 'btn-outline-secondary'
                            : 'btn-outline-primary')
                    }
                    onClick={() => {
                        setcurPages(numPages)
                    }}
                    disabled={curPages >= numPages}
                >
                    Last
                </button>
            </div>

        </div>
    );
}

export default Todo;
