import React from 'react';
import {
    Link
  } from "react-router-dom";

class LeagueViewDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            league: null,
            seriesCount: 0,
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
        return this.setState({ seriesCount: json.filterSeries.length })
    }

    render() {
        const {league, seriesCount, scheduleCount} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3 leagueViewArea">
                        <p className="headline"> Series Count <span className="float-right"><Link to={`/create/series/${league}`}><i className="fas fa-plus"></i> Add</Link></span> </p>
                        <p className="count">{seriesCount}</p>
                    </div>
                    <div className="col-3 leagueViewArea">
                        <p className="headline"> Schedule Count <span className="float-right"><a href="#"><i className="fas fa-plus"></i> Add</a></span> </p>
                        <p className="count">{scheduleCount}</p>
                    </div>
                    <div className="col-3 leagueViewArea">
                        <p className="headline upload"> Upload Results </p>
                        
                        <p className="text-center"><a href="#"><i className="fas fa-plus fa-6x"></i></a></p>
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