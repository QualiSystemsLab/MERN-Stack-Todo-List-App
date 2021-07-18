import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const REVERSE_PROXY_URL = window.origin // USING A REVERSE PROXY
console.log(`REVERSE PROXY: ${REVERSE_PROXY_URL}`)


const Todo = props => (
    <tr>
        <td className = { props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className = { props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className = { props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
)


export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        axios.get(`${REVERSE_PROXY_URL}/todos`)
            .then( res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch( err => console.log(err));
    }

    componentDidUpdate() {
        axios.get(`${REVERSE_PROXY_URL}/todos`)
            .then( res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch( err => console.log(err));
    }

    todoList = () => this.state.todos.map(
        (todo, index) => <Todo todo={todo} key={index} />
    )
    

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}