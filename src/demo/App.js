/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { Graph2D} from '../lib';

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
                <Graph2D
                    graphData={{
                        nodes:[
                        {"__nodeId":"3", 
                        "is_inferred":False, 
                        "name": "Susan T", 
                        "__nodeLabel":"Susan T",
                        "__nodeColor":"cornflowerblue", 
                        "__nodeIcon":"fa-solid fa-user", 
                        "__thingType":"person", 
                        "__rootType":"entity"}
                    ]
                    }}
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
