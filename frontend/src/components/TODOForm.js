import React from 'react'

class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', user: '', project: ''}
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
                "user": ''
            })
            return;
        }
        let user = ''
        for (let i = 0; i < event.target.selectedOptions.length; i++){
            user = (event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'user': user
        })
    }

    handleSubmit(event) {
        this.props.createTODO(this.state.text, this.state.user, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input type="text" className="form-control" name="text" placeholder="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project"></label>
                    <input type="text" className="form-control" name="project" placeholder="project"
                           value={this.state.project} onChange={(event) => this.handleChange(event)}/>
                </div>
               <select name='users' onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TODOForm;

