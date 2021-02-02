/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { Graph2D, Graph3D} from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <dash-react-force-graph
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
