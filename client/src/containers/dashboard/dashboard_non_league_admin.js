import React from 'react';

class NonLeagueDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: {},
            admin: false,
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <div> Non League Dashboard</div>
        )
    }
}

export default NonLeagueDashboard;