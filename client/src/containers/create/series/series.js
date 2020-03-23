import React from 'react';
import ErrorHandler from '../../../components/error/error';

class CreateSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            season: '',
            league: '',
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.createSeries = this.createSeries.bind(this);
    }

    componentDidMount() {
        const { pathname } = this.props.location
        this.setState({ league: pathname.substr(15) })
    }

    handleChange(e, type) {
        if (type === 'name') return this.setState({ name: e.target.value });
        if (type === 'season') return this.setState({ season: e.target.value });
    }

    async createSeries(e) {
        e.preventDefault();
        const { name, season, league } = this.state;
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const data = {
            name,
            season,
            league
        }
        const a = await fetch('http://localhost:7430/api/v1/series', {
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
                        <h1 className="createHeader">Create Series</h1>
                        <div className="form_create">
                            <ErrorHandler error={this.state.error} />
                            <form>
                                <p className="label">Series Name</p>
                                <div className="form-group">
                                    <input type="type" className="form-control" placeholder="Enter Series Name" onChange={(e) => {this.handleChange(e, 'name')}} />
                                </div>
                                <p className="label">Series Season</p>
                                <div className="form-group">
                                    <input type="type" className="form-control" placeholder="Enter Season" onChange={(e) => {this.handleChange(e, 'season')}} />
                                </div>
                                <button type="submit" className="btn btn-primary float-right" onClick={this.createSeries}>Create Series</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateSeries;