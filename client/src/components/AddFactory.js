import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, Button, TextField } from '@material-ui/core';


  


export class AddFactory extends Component {
    state = {
        name: '',
        upperBound: '',
        lowerBound: '',
        childNodes: '',
        numberOfNodes: ''
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

        this.props.addFactory( {name: this.state.name, 
            upperBound: this.state.upperBound, 
            lowerBound: this.state.lowerBound, 
            childNodes: cNodes, 
            numberOfNodes: this.state.numberOfNodes

        });
        
        //this.props.AddFactory( {name: this.state.name /*, upperBound:this.state.upperBound, lowerBound: this.state.lowerBound, childNodes: [1,2,3]*/});
        //this.setState({ name: '' } /*, { upperBound: ''}, { lowerBound: ''} */ );
    }



    

    render() {
        return (
            <div>
 


    <ExpansionPanel>
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
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Number of Nodes"
                    value={this.state.numberOfNodes}
                    onChange={this.onChange}
                />
                <Button
                    type="submit"
                    value="submit"
                    className="btn">
                        Add Factory
                    </Button>
                
                
                {/* <input
                    type="submit"
                    value="submit"
                    className="btn"
                    style={{flex: 1}}
                /> */}



            </form>
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
