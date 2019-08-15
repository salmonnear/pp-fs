import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

export class AdjustFactory extends Component {
    state = {
        name: '',
        upperBound: '',
        lowerBound: '',
        childNodes: '',
        numberOfNodes: ''

    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} >
                <TextField 
                    type="text" 
                    name="name" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Factory Name"
                    value={this.state.name}
                    onChange={this.onChange}
                />
                <TextField
                    type="number" 
                    name="lowerBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Lower Bound"
                    value={this.state.lowerBound}
                    onChange={this.onChange}
                />
                <TextField
                    type="number" 
                    name="upperBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Upper Bound"
                    value={this.state.upperBound}
                    onChange={this.onChange}
                />
                <TextField
                    type="number" 
                    name="numOfNodes" 
                    style={{ flex: '12', padding: '5px' }}
                    placeholder="Number of Nodes"
                    value={this.state.upperBound}
                    onChange={this.onChange}
                />
                {/* <input
                    type="submit"
                    value="submit"
                    className="btn"
                    style={{flex: '10'}}
                /> */}
                
                <Button
                    type="submit"
                    value="submit"
                    className="btn">
                        Confirm
                </Button>
                </form>
            </div>
        )
    }
}

export default AdjustFactory
