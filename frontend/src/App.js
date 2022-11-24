import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/Users.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/get_users')
            .then(response => {
                const users = response.data
                    this.setState({
                            'users': users
                    });
            }).catch(err => console.log(err));

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                    this.setState({
                            'projects': projects
                    });
            }).catch(err => console.log(err));

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todos = response.data
                    this.setState({
                            'todos': todos
                    });
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/todo'>Todo</Link>
                        </li>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element={<TodoList todos={this.state.todos} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
