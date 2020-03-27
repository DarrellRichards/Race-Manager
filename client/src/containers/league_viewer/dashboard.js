import React from 'react';
import {
    Link
  } from "react-router-dom";

class LeagueViewDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            league: null,
            seriesCount: [],
            scheduleCount: 0,
        }
    }

    componentDidMount() {
        const { pathname } = this.props.location
        this.setState({ league: pathname.substr(8) });
        this.fetchSeriesCount();
    }

    async fetchSeriesCount() {
        const {pathname} = this.props.location;
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const a = await fetch(`http://localhost:7430/api/v1/series?league=${pathname.substr(8)}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decodedToken}`
            }
        });

        const json = await a.json();
        console.log(json);
        if (json.message) return this.setState({ error: json.message });
        return this.setState({ seriesCount: json.filterSeries })
    }

    render() {
        const {league, seriesCount, scheduleCount} = this.state;
        const series = seriesCount.map(series => {
            return (<tr key={series._id}>
                <th scope="row">{series.name}</th>
                <td><Link to={`/season/${series.season._id}`}>{series.season.name}</Link></td>
                <td>{series.cars}</td>
                <td><Link to=""><i className="far fa-edit fa-1x"></i></Link> | <Link to="#"><i className="far fa-trash-alt fa-1x"></i></Link></td>
            </tr>)
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <h1 className="createHeader">Series</h1>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Series Name</th>
                            <th scope="col">Season</th>
                            <th scope="col">Cars</th>
                            <th scope="col">Actions</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {series}
                        </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <h2>Past Events</h2>
                    {/* Display Old Events */}
                </div>
            </div>
        )
    }
}

export default LeagueViewDashboard;