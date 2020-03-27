import React from 'react';
import ErrorHandler from '../../../components/error/error';

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        const {pathname} = this.props.location;
        this.state = {
            name: '',
            track: '',
            date: '',
            race_length: '',
            series: pathname.substr(46),
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.cancel = this.cancel.bind(this);
        console.log(this.props.match);
    }

    handleChange(e, type) {
        if(type === 'name') return this.setState({ name: e.target.value });
        if(type === 'date') return this.setState({ date: e.target.value });
        if(type === 'track') return this.setState({ track: e.target.value });
        if(type === 'race_length') return this.setState({ race_length: e.target.value });
    }

    async createEvent(e) {
        e.preventDefault();
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const a = await fetch('http://localhost:7430/api/v1/schedule', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decodedToken}`
              },
            body: JSON.stringify(this.state)
        });

        const json = await a.json();
        if (json.message) return this.setState({ error: json.message });
        console.log(json);
        return this.props.history.goBack();
    }

    cancel(e) {
        e.preventDefault();
        return this.props.history.goBack();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="createHeader">Create Event</h1>
                        <div className="form_create">
                            <ErrorHandler error={this.state.error} />
                            <form>
                                <p className="label">Event Name</p>
                                <div className="form-group">
                                    <input type="type" className="form-control" placeholder="Enter Event Name" onChange={(e) => {this.handleChange(e, 'name')}} />
                                </div>
                                <p className="label">Event Track</p>
                                <div className="form-group">
                                    <input type="type" className="form-control" placeholder="Enter Track Name" onChange={(e) => {this.handleChange(e, 'track')}} />
                                </div>
                                <p className="label">Event Date</p>
                                <div className="form-group">
                                    <input type="date" className="form-control" onChange={(e) => {this.handleChange(e, 'date')}} />
                                </div>
                                <p className="label">Lap Count</p>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="100 Laps" onChange={(e) => {this.handleChange(e, 'race_length')}} />
                                </div>
                                <button type="submit" className="btn btn-primary float-left" onClick={this.createEvent}>Create Event</button>
                                <button type="submit" className="btn btn-light float-right" onClick={this.cancel}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEvent;