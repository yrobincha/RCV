import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: []
        }
    }
    componentWillMount() {
        fetch('/') 
            .then(res => res.json())
            .then(data => this.setState({
                tests: data
            }));
    }
    render() {
        const { tests } = this.state;
        const result = tests.title;
        return (
            <div>
                {result}
            </div>
        );
    }
}
export default Test;
