import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelDetails, Button, TextField, ExpansionPanelSummary } from '@material-ui/core';

import AddBoxIcon from '@material-ui/icons/AddBox';

  
export class AddFactory extends Component {
    state = {
        name: '',
        upperBound: '',
        lowerBound: '',
        childNodes: '',
        numberOfNodes: '',
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

        cNodes = numbers.map((num) => num = Number(this.state.lowerBound) + Math.round(num*(this.state.upperBound-this.state.lowerBound)));

        this.props.addFactory( {name: this.state.name, 
            upperBound: this.state.upperBound, 
            lowerBound: this.state.lowerBound, 
            childNodes: cNodes, 
            numberOfNodes: this.state.numberOfNodes

        });

    }


    render() {
        return (
            <div>
 

    
    <ExpansionPanel>
        <ExpansionPanelSummary
                expandIcon={<AddBoxIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                    Add Factory
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <form onSubmit={this.onSubmit} >
                <TextField 
                    required
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
                    name="numberOfNodes" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Number of Nodes"
                    value={this.state.numberOfNodes}
                    onChange={this.onChange}
                />
                <br/>
                <Button
                    type="submit"
                    value="submit"
                    className="btn">
                        Add
                    </Button>

            </form>
            </ExpansionPanelDetails>
            </ExpansionPanel>

            </div>
           
        )
    }
}



// PropTypes
AddFactory.propTypes = {
    addFactory: PropTypes.func.isRequired
}

export default AddFactory
