import React from 'react';
import {Link} from 'react-router-dom';

class SeasonContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'events': [],
            'error': '',
        }
    }

    async componentDidMount() {
        // Fetch Season
        await this.fetchSeason();
    }

    async fetchSeason() {
        const {id} = this.props.match.params;
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        try {
            const a = await fetch(`http://localhost:7430/api/v1/schedule?season=${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decodedToken}`
                }
            });

            const json = await a.json();
            if (json.message) return this.setState({ error: json.message });
            return this.setState({ events: json.schedules });
        } catch (error) {
            return this.setState({error});
        }
    }

    render() {
        const {events} = this.state;
        const {id} = this.props.match.params;
        let series;
        const {pathname} = this.props.location;
        const eventsLayout = events.map(event => {
            series = event.series._id;
            return (<tr key={event._id}>
                <th scope="row">{event.name}</th>
                <td>{event.date}</td>
                <td>{event.track}</td>
                <td>{event.series.cars}</td>
                <td>{event.race_length}</td>
                {event.results
                    ? <td className="text-center"><Link to={`/results/${event.results._id}`}><i className="fas fa-flag-checkered"></i></Link></td>
                    : <td className="text-center"><Link to={`/season/${id}/upload/results/${event._id}`}><i className="fas fa-plus"></i></Link></td>
                }
                <td className="text-center"><Link to=""><i className="far fa-edit fa-1x"></i></Link> <Link to="#"><i className="far fa-trash-alt fa-1x"></i></Link></td>
            </tr>)
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="createHeader">Season Schedule</h1>
                        <div className="mb-2">
                            <Link to={`${pathname}/create/event/${series}`} className="btn btn-info">Edit Season</Link>
                        </div>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Event Name</th>
                                <th scope="col">Event Date</th>
                                <th scope="col">Event Track</th>
                                <th scope="col">Cars</th>
                                <th scope="col">Race Length</th>
                                <th scope="col" className="text-center">Upload Results</th>
                                <th scope="col" className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventsLayout}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Link to={`${pathname}/create/event/${series}`} className="btn btn-dark float-left">Add Race</Link>
                    </div>
                    <div className="col-6">
                        <button type="button" className="btn btn-dark float-right">Add Chase</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SeasonContainer;