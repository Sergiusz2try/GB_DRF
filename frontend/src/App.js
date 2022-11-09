import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/Users.js';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState({
                            'users': users
                    });
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users} />
            </div>
        )
    }
}

export default App;
