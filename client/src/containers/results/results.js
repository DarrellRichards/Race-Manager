import React from 'react';
import { Link } from 'react-router-dom';

class ResultContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {},
            drivers: [],
        }

        this.fetchResults = this.fetchResults.bind(this);

        this.fetchResults();
    }

    async fetchResults() {
        // Fetch Results
        const {result} = this.props.match.params;
        console.log(this.props.match.params)
        const token = localStorage.getItem('wearehere');
        const decodedToken = atob(token);
        const a = await fetch(`http://localhost:7430/api/v1/results/${result}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decodedToken}`
            }
        });

        const json = await a.json();
        if (json.message) return this.setState({ error: json.message });
        json.results.drivers.sort((a, b) => parseFloat(a.finish_pos) - parseFloat(b.finish_pos));
        return this.setState({ results: json.results, drivers: json.results.drivers })
    }
    render() {
        const {drivers} = this.state;
        let displayResults = null;
        if (drivers) {
            displayResults = drivers.map(driver => {
                return (
                    <tr key={driver._id}>
                        <th scope="row">{driver.finish_pos}</th>
                        <td>{driver.start_pos}</td>
                        <td>{driver.name}</td>
                        <td>{driver.points}</td>
                        <td>{driver.points - driver.bonus_points}</td>
                        <td>{driver.bonus_points}</td>
                        <td>{driver.pen_points}</td>
                        <td>{driver.int}</td>
                        <td>{driver.laps_comp}</td>
                        <td>{driver.laps_led}</td>
                        <td>{driver.fast_lap_time}</td>
                        <td>{driver.fast_lap}</td>
                        <td>{driver.inc}</td>
                        <td className="text-center"><Link to=""><i className="far fa-edit fa-1x"></i></Link> <Link to="#"><i className="far fa-trash-alt fa-1x"></i></Link></td>
                    </tr>
                )
            });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <h1 className="createHeader">Results</h1>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Fin</th>
                                <th scope="col">St</th>
                                <th scope="col">Driver Name</th>
                                <th scope="col">Total Points</th>
                                <th scope="col">Race Points</th>
                                <th scope="col">Bonus Points</th>
                                <th scope="col">Pen Points</th>
                                <th scope="col">Int</th>
                                <th scope="col">Laps</th>
                                <th scope="col">Laps Lead</th>
                                <th scope="col">Fastest Lap</th>
                                <th scope="col">Fastest Lap #</th>
                                <th scope="col">Inc</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayResults}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultContainer;