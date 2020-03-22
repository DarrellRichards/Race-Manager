import React from 'react';
import {Redirect} from 'react-router-dom';

const ErrorHandler = (props) => {
    const { error } = props;
    if (error) {
        return <div className="errorMessage"> {error} </div>
    } else {
        return null;
    }
} 

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driverName: '',
            password: '',
            error: '',
        }
        this.doLogin = this.doLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, type) {
        if (type === 'driver') this.setState({ driverName: e.target.value });
        if (type === 'password') this.setState({ password: e.target.value });
    }

    async doLogin(e) {
        e.preventDefault();
        const { driverName, password }  = this.state;
        if (!driverName) return this.setState({ error: 'Driver Name was not provided.' });
        if (!password) return this.setState({ error: 'Password was not provided.' });
        const data = {
            username: driverName,
            password
        }
        const a = await fetch('http://localhost:7430/api/v1/drivers/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        });

        const json = await a.json();
        if (json.message) return this.setState({ error: json.message });
        const encodedString = btoa(json.token);
        localStorage.setItem('wearehere', encodedString);

        return this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="App">
                            <img src="https://simracingpoints.com/league/v1/assets/images/logo_dark.png" />
                            <ErrorHandler error={this.state.error} />
                            <p className="driverLogin">Driver Sign In</p>
                            <form>
                                <div className="form-group">
                                    <input type="type" className="form-control" id="inputDriver" placeholder="Enter Driver Name" onChange={(e) => {this.handleChange(e, 'driver')}} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="inputPassword" placeholder="Enter Password" onChange={(e) => {this.handleChange(e, 'password')}} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.doLogin} id="signIn">Sign in</button>
                            </form>
                            <div className="signUp">
                                <p>Do you need a account? Sign up here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}

export default LoginContainer;