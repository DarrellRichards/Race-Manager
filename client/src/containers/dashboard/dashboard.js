import React from 'react';
import {
    Link,
  } from 'react-router-dom'

class LeagueDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: {},
            leagues: [],
            showModal: false,
        }
        this.createLeague = this.createLeague.bind(this);
    }

    async componentDidMount() {
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const a = await fetch('http://localhost:7430/api/v1/drivers/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decodedToken}`
              }
        });
        const json = await a.json();
        const { driver } = json;
        this.setState({driver});
    }

    createLeague() {
        console.log(this.props.history);
        return this.props.history.push('/create/league');
    }

    viewLeague(league) {
        return this.props.history.push(`/league/${league}`);
    }

    render() {
        const {driver} = this.state;
        let leagues = null;
        if (Object.keys(driver).length !== 0) {
            leagues = driver.leagues.map(league => {
                return (<div className="col-3 leagueView">
                    <h4>{league.league.name}</h4>
                    <Link to={`/league/${league.league._id}`}>View League</Link>
                    {/* <button className="btn btn-primary" onClick={() => this.viewLeague(league.league._id)}></button> */}
                </div>);
            })
        }
        
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h2>Current Leagues</h2>
                        </div>
                        <div className="col-6">
                            <button type="submit" className="btn btn-primary float-right" onClick={this.createLeague}>Create League</button>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                {leagues} 
                            </div>
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-12">
                            <h2>Upcoming Events</h2> 
                            <div className="row">
                                <div className="col-3">
                                    <h4>Event 1</h4>
                                </div>
                                <div className="col-3">
                                    <h4>Event 2</h4>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default LeagueDashboard;