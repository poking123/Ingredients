import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
        };
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    login = (e) => {

    }

    render() {
        return (
            <form className="createAnAccountForm">
                <div class="form-group">
                    <label for="usernameOrEmail">Username or Email address</label>
                    <input type="email" class="form-control" id="usernameOrEmail" name="usernameOrEmail" placeholder="Enter username or email address" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary" onClick={(e) => this.login(e)}>Login</button>
            </form>
        )
    }
}


export default Login;