import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/Users.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import LoginForm from './components/Auth.js';
import ProjectForm from "./components/ProjectForm";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import TODOForm from "./components/TODOForm";



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

    createProject(name, users, repo_link) {
        const headers = this.get_headers()
        const data = {name:name, users:users, repo_link:repo_link}
        axios.post('http://127.0.0.1:8000/api/projects/', data,{headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`,{headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }

    createTODO(text, user, project) {
        const headers = this.get_headers()
        const data = {text: text, user: user, project: project}
        axios.post('http://127.0.0.1:8000/api/todo', data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }

    delete_todo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`,{headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        return this.state.token !== ''
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

        axios.get('http://127.0.0.1:8000/api/0.1/get_users', {headers})
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
                        <Route exact path='/projects' element={<ProjectList
                            projects={this.state.projects}
                            deleteProject={(id)=>this.deleteProject(id)} />} />
                        <Route exact path='/projects/create' element={<ProjectForm
                            users={this.state.users}
                            createProject={(name, users, repo_link)=>this.createProject(name, users, repo_link)} />} />
                        <Route exact path='/todo' element={<TodoList
                            todos={this.state.todos} delete_todo={(id)=>this.delete_todo(id)} />} />
                        <Route exact path='/todo/create' element={<TODOForm
                            users={this.state.users}
                            createTODO={(text, user, project)=>this.createTODO(text, user, project)} />} />
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
