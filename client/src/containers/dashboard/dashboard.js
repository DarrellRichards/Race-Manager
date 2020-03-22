import React from 'react';

class LeagueDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: {},
            leagues: [],
        }
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

        // const league = await fetch('http://localhost:7430/api/v1/league', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${decodedToken}`
        //       }
        // });
        // const jsonleague = await league.json();
        // console.log(jsonleague);
        // this.setState({ driver });
    }

    render() {
        const {driver} = this.state;
        console.log(driver);
        let leagues = null;
        if (Object.keys(driver).length !== 0) {
            leagues = driver.leagues.map(league => {
                return (<div className="col-3">
                    <h4>{league.league.name}</h4>
                </div>);
            })
        }
        
        return(
            <div className="container">
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
                <div className="row">
                    <div className="col-6">
                        <h2>Current Leagues</h2>
                    </div>
                    <div className="col-6">
                    <button type="submit" className="btn btn-primary float-right">Create League</button>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            {leagues} 
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default LeagueDashboard;