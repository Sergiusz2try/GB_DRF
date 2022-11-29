import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/Users.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import LoginForm from './components/Auth.js';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {this.set_token(response.data['token'])})
            .catch(err => alert("Неверный логин или пароль"))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/get_users', {headers})
            .then(response => {
                const users = response.data
                    this.setState({
                            'users': users
                    });
            }).catch(err => console.log(err));

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data
                    this.setState({
                            'projects': projects
                    });
            }).catch(err => console.log(err));

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data
                    this.setState({
                            'todos': todos
                    });
            }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.get_token_storage()
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
                        <li>
                            {this.is_auth() ? <button onClick={() =>
                                this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element={<TodoList todos={this.state.todos} />} />
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) =>
                            this.get_token(username, password)} />} />
                        <Route component={NotFound404} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
