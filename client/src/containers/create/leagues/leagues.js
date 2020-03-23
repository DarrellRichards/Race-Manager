import React from 'react';
import ErrorHandler from '../../../components/error/error';

class CreateLeague extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.createLeague = this.createLeague.bind(this);
    }

    handleChange(e, type) {
        this.setState({ name: e.target.value });
    }

    async createLeague(e) {
        e.preventDefault();
        const { name } = this.state;
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const data = {
            name,
        }
        const a = await fetch('http://localhost:7430/api/v1/leagues', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decodedToken}`
              },
            body: JSON.stringify(data)
        });

        const json = await a.json();
        if (json.message) return this.setState({ error: json.message });
        return this.props.history.goBack();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="createHeader">Create League</h1>
                        <div className="form_create">
                            <p className="label">League Name</p>
                            <ErrorHandler error={this.state.error} />
                            <form>
                                <div className="form-group">
                                    <input type="type" className="form-control" placeholder="Enter League Name" onChange={(e) => {this.handleChange(e)}} />
                                </div>

                                <button type="submit" className="btn btn-primary float-right" onClick={this.createLeague}>Create League</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateLeague;