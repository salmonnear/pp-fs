import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

export class AdjustFactory extends Component {
    state = {
        name: '',
        nameIsDiff: false,
        upperBound: '',
        upperBoundIsDiff: false,
        lowerBound: '',
        lowerBoundIsDiff: false,
        childNodes: '',
        childNodesIsDiff: false,
        numberOfNodes: '',
        numberOfNodesIsDiff: false,
        _id: ''

    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var cNodes = [];
        var numbers = [];
        
        for (var i=0; i < this.state.numberOfNodes; i++) {
            numbers.push(Math.random());
        };
        console.log(numbers);

        cNodes = numbers.map((num) => num = Math.round(((this.state.upperBound-this.state.lowerBound)*num) + this.state.lowerBound),0);

        console.log(cNodes);

        this.props.adjustFactory( this.state._id, { 
            
            "ok": "ok"
        }
                /*"propName": "name", "value": this.state.name }*/
            
            /*
            name: this.state.name,
            upperBound: this.state.upperBound, 
            lowerBound: this.state.lowerBound, 
            childNodes: cNodes, 
            numberOfNodes: this.state.numberOfNodes
            */
        );
        
        //this.props.AddFactory( {name: this.state.name /*, upperBound:this.state.upperBound, lowerBound: this.state.lowerBound, childNodes: [1,2,3]*/});
        //this.setState({ name: '' } /*, { upperBound: ''}, { lowerBound: ''} */ );
    }



    render() {
        const { _id, name, childNodes, upperBound, lowerBound } = this.props.factory;
        return (
            <div>
                <h3>Adjust Factory</h3>
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
                    type="text" 
                    name="lowerBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Lower Bound"
                    value={this.state.lowerBound}
                    onChange={this.onChange}
                />
                <TextField
                    type="text" 
                    name="upperBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Upper Bound"
                    value={this.state.upperBound}
                    onChange={this.onChange}
                />
                <TextField
                    type="text" 
                    name="numberOfNodes" 
                    style={{ flex: '12', padding: '5px' }}
                    placeholder="Number of Nodes"
                    value={this.state.numberOfNodes}
                    onChange={this.onChange}
                />
                {/* <input
                    type="submit"
                    value="submit"
                    className="btn"
                    style={{flex: '10'}}
                /> */}
                
                <Button
                    //onClick={this.props.adjustFactory.bind(this, _id)}
                    type="submit"
                    value="submit"
                    className="btn">
                        Update
                </Button>
                </form>
            </div>
        )
    }
}

export default AdjustFactory
