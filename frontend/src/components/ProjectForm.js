import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', users: [], repo_link: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                "users": []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++){
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.users, this.state.repo_link)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" className="form-control" name="name" placeholder="name"
                           value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="repo_link"></label>
                    <input type="text" className="form-control" name="repo_link" placeholder="repo_link"
                           value={this.state.repo_link} onChange={(event) => this.handleChange(event)}/>
                </div>
                <select name='users' multiple onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm;

