import React from 'react';

const ErrorHandler = (props) => {
    const { error } = props;
    if (error) {
        return <div className="errorMessage"> {error} </div>
    } else {
        return null;
    }
} 

class RegisterController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driverName: '',
            password: '',
            email: '',
            error: '',
        }
        this.doRegister = this.doRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, type) {
        if (type === 'driver') this.setState({ driverName: e.target.value });
        if (type === 'password') this.setState({ password: e.target.value });
        if (type === 'email') this.setState({ email: e.target.value });
    }

    async doRegister(e) {
        e.preventDefault();
        const { driverName, password, email }  = this.state;
        if (!driverName) return this.setState({ error: 'Driver Name was not provided.' });
        if (!password) return this.setState({ error: 'Password was not provided.' });
        if (!email) return this.setState({ error: 'Email was not provided.' });
        const data = {
            driverName,
            password, 
            email
        }
        const a = await fetch('http://localhost:7430/api/v1/drivers/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        });

        const json = await a.json();
        if (json.message) return this.setState({ error: json.message });
        console.log(json);
        // const encodedString = btoa(json.token);
        // localStorage.setItem('wearehere', encodedString);

        // return this.props.history.push("/login");
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="App">
                            <img src="https://simracingpoints.com/league/v1/assets/images/logo_dark.png" />
                            <ErrorHandler error={this.state.error} />
                            <p className="driverLogin">Driver Sign Up</p>
                            <form>
                                <div className="form-group">
                                    <input type="type" className="form-control inputField" placeholder="Enter Driver Name" onChange={(e) => {this.handleChange(e, 'driver')}} />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control inputField" placeholder="Enter Email" onChange={(e) => {this.handleChange(e, 'email')}} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control inputField" placeholder="Enter Password" onChange={(e) => {this.handleChange(e, 'password')}} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.doRegister} id="signIn">Register</button>
                            </form>
                            <div className="signUp">
                                <p>Already have a account? <a href="/login">Sign In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}

export default RegisterController;