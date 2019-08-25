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
        _id: '',
        allValid: false
    }


    generateChildren = (lower, upper, numOfNodes) => {
        var cNodes = [];
        var numbers = [];
        
        for (var i=0; i < this.state.numberOfNodes; i++) {
            numbers.push(Math.random());
        };

        cNodes = numbers.map((num) => num = Number(this.state.lowerBound) + Math.round(num*(this.state.upperBound-this.state.lowerBound)));
        return cNodes;
    }

    checkValidity = () => {
        return true;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.generateChildren(this.state.lowerBound, this.state.upperBound, this.state.numberOfNodes);

        var children = [];

        children = this.generateChildren(this.state.lowerBound, this.state.upperBound, this.state.numberOfNodes);
        console.log(children);

        this.props.addFactory( {name: this.state.name, 
            upperBound: this.state.upperBound, 
            lowerBound: this.state.lowerBound, 
            childNodes: children, 
            numberOfNodes: this.state.numberOfNodes

        });

        this.setState({
            name: '',
            lowerBound: '',
            upperBound: '',
            numberOfNodes: ''
        })


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
                    fullWidth
                    label="Name"
                    type="text" 
                    name="name" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Factory Name"
                    value={this.state.name}
                    onChange={this.onChange}
                />
                <br/>
                <TextField
                    fullWidth
                    label="Lower"
                    type="number" 
                    name="lowerBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Lower Bound"
                    value={this.state.lowerBound}
                    onChange={this.onChange}
                    InputProps={{inputProps: { min: 0, max: Number(this.state.upperBound)-1}}}
                />
                <br/>
                <TextField
                    fullWidth
                    label="Upper"
                    type="number" 
                    name="upperBound" 
                    style={{ flex: '10', padding: '5px' }}
                    //placeholder="Upper Bound"
                    value={this.state.upperBound}
                    onChange={this.onChange}
                    InputProps={{inputProps: { min:  Number(this.state.lowerBound)+1 /*!=="" ?  : */, max: 1000000}}}
                />
                <br/>
                <TextField
                    fullWidth
                    label="Nodes"
                    type="number" 
                    min="0"
                    max="15"
                    name="numberOfNodes" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Nodes"
                    value={this.state.numberOfNodes}
                    onChange={this.onChange}
                    InputProps={{inputProps: { min: 0, max: 15}}}
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
