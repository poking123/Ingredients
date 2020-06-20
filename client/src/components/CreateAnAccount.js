import React from 'react';
import { graphql } from 'react-apollo';
import { v4 as uuidv4 } from 'uuid';
import { addUserMutation } from '../queries/queries';

class CreateAnAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
        };
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        // Registers User
        e.preventDefault();

        const { username, password, email } = this.state;
        console.log(this.props)
        this.props.addUserMutation({
            variables: {
                id: uuidv4(),
                username,
                password,
                email,
            }
        });
    }

    render() {
        return (
            <div className="createAnAccountForm">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)} placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" name="password" value={this.state.password} onChange={e => this.handleInputChange(e)} placeholder="Enter Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={e => this.handleInputChange(e)} placeholder="Enter email" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Register</button>
                </form>
            </div>)
    }
}


export default graphql(addUserMutation, { name: "addUserMutation" })(CreateAnAccount);