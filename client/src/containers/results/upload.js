import React from 'react';
import ErrorHandler from '../../components/error/error';

class UploadContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            file: '',
            event_1: {},
            series: '',
            schedule: '',
        }
        this.uploadResults = this.uploadResults.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchEvent = this.fetchEvent.bind(this);
    }
    async componentDidMount() {
        await this.fetchEvent();
        console.log(this.state);
    }

    async fetchEvent() {
        const {event} = this.props.match.params;
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const a = await fetch(`http://localhost:7430/api/v1/schedule/${event}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decodedToken}`
            }
        });

        const json = await a.json();
        if (json.message) return this.setState({ error: json.message });
        return this.setState({ event_1: json.event })
    }

    handleChange(e) {
        const files = e.target.files;
        this.setState({ file: files });
    }

    async uploadResults(e) {
        e.preventDefault();
        const { file, event_1 } = this.state;
        const { id, event } = this.props.match.params;
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const form = new FormData();
        form.append('result', file[0]);
        form.append('series', event_1.series);
        form.append('schedule', event);
        form.append('season', id);
        try {
            const a = await fetch(`http://localhost:7430/api/v1/results/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${decodedToken}`
            },
            body: form,
        });

            const json = await a.json();
            return this.props.history.goBack();
        } catch (error) {
            return this.setState({ error: 'Something went wrong uploading results' });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="createHeader">Upload Race Results</h1>
                        <div className="form_create">
                            <ErrorHandler error={this.state.error} />
                            <form>
                                <p className="label">Upload Results (CSV File)</p>
                                <div className="form-group">
                                    <input type="file" className="form-control" placeholder="Enter Event Name" onChange={(e) => {this.handleChange(e)}} />
                                </div>
                                <button type="submit" className="btn btn-primary float-left" onClick={this.uploadResults}>Upload Race Results</button>
                                <button type="submit" className="btn btn-light float-right" onClick={this.cancel}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadContainer;