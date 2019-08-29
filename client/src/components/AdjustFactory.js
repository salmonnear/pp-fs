import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

export class AdjustFactory extends Component {
    state = {
        name: '',
        newName: '',
        nameForUpdate: '',
        gotNewName: false,
        newNameIsValid: true,
        upperBound: '',
        newUpperBound: '',
        upperForUpdate: '',
        gotNewUpper: false,
        newUpperBoundIsValid: true,
        lowerBound: '',
        newLowerBound: '',
        lowerForUpdate: '',
        gotNewLower: false,
        newLowerBoundIsValid: true,
        childNodes: '',
        newChildNodes: '',
        newChildNodesIsValid: true,
        numberOfNodes: '',
        newNumberOfNodes: '',
        numberOfNodesForUpdate: '',
        gotNewNumberOfNodes: false,
        newNumberOfNodesIsValid: true,
        _id: '',
        allValid: false

    }



    componentDidMount() {
        this.setState({ numberOfNodes: this.props.factory.numberOfNodes });
        this.setState({ childNodes: this.props.factory.childNodes });
        this.setState({ lowerBound: this.props.factory.lowerBound });
        this.setState({ upperBound: this.props.factory.upperBound });
        this.setState({ name: this.props.factory.name });
        this.setState({ _id: this.props.factory._id });
    }

    generateChildren = (lower, upper, numOfNodes) => {
        var cNodes = [];
        var numbers = [];
        

        for (var i=0; i < this.state.numberOfNodesForUpdate; i++) {
            numbers.push(Math.random());
        };

        cNodes = numbers.map((num) => num = Number(this.state.lowerForUpdate) + Math.round(num*(this.state.upperForUpdate-this.state.lowerForUpdate)));
        return cNodes;
    }

    
    checkFormValidity = () => {

        // need to check for upper and lower conflicts here...
        if (this.state.gotNewUpper && typeof this.state.newUpperBound !== 'number') {
            this.setState({ newUpperBoundIsValid: false});
        }
        if (this.state.gotNewLower && typeof this.state.newLowerBound !== 'number') {
            this.setState({ newLowerBoundIsValid: false});
        }
        if (this.state.gotNewNumberOfNodes && typeof this.state.newNumberOfNodes !== 'number') {
            this.setState({ newNumberOfNodesIsValid: false});
        }

        //name doesn't matter, don't check it
        if (this.state.newUpperBoundIsValid && this.state.newLowerBoundIsValid && this.state.newNumberOfNodesIsValid) {
            this.setState({ allValid: true })
        }
    }
    



    onChange = (e) => {

        var targName = e.target.name;
        var targVal = e.target.value;



        this.setState({ [e.target.name]: e.target.value },
            () => {
                // for name
                if (targName === 'newName' && targVal.length > 0) {
                    this.setState({gotNewName: true}, () => {
                        (this.state.gotNewName? this.setState({ nameForUpdate: this.state.newName}) : this.setState({ nameForUpdate: this.state.name}) );
                    });
                    
                } else if (targName === 'newName' && targVal.length < 1) {
                    this.setState({gotNewName: false});
                }
                // for lower
                if (targName === 'newLowerBound' && targVal.length > 0) {
                    this.setState({gotNewLower: true}, () => {
                        (this.state.gotNewLower? this.setState({ lowerForUpdate: this.state.newLowerBound}) : this.setState({ lowerForUpdate: this.state.lowerBound}) );
                    });
                    
                } else if (targName === 'newLowerBound' && targVal.length < 1) {
                    this.setState({gotNewLower: false});
                }
                // for upper
                if (targName === 'newUpperBound' && targVal.length > 0) {
                    this.setState({gotNewUpper: true}, () => {
                        (this.state.gotNewUpper? this.setState({ upperForUpdate: this.state.newUpperBound}) : this.setState({ upperForUpdate: this.state.upperBound}) );
                    });
                    
                } else if (targName === 'newUpperBound' && targVal.length < 1) {
                    this.setState({gotNewUpper: false});
                }
                (this.state.gotNewUpper? this.setState({ upperForUpdate: this.state.newUpperBound}) : this.setState({ upperForUpdate: this.state.upperBound}) );
                // for numNodes
                if (targName === 'newNumberOfNodes' && targVal.length > 0) {
                    this.setState({gotNewNumberOfNodes: true}, () => {
                        (this.state.gotNewNumberOfNodes? this.setState({ numberOfNodesForUpdate: this.state.newNumberOfNodes}) : this.setState({ numberOfNodesForUpdate: this.state.numberOfNodes}) );
                    });
                    
                } else if (targName === 'newNumberOfNodes' && targVal.length < 1) {
                    this.setState({gotNewNumberOfNodes: false});
                }
            });
/*
            this.setState({ [e.target.name]: e.target.value },
                () => {
                    if (e.target.name === 'newName' && e.target.value.length > 0) {
                        this.setState({gotNewName: true});
                    } else if (e.target.name === 'newName' && e.target.value.length < 1) {
                        this.setState({gotNewName: false});
                    }
                });

                */

        //set gotNewXXXX state while typing
        /*
        if (e.target.name === 'newName' && e.target.value.length > 0) {
            this.setState({gotNewName: true});
        } else if (e.target.name === 'newName' && e.target.value.length < 1) {
            this.setState({gotNewName: false});
        }

        if (e.target.name === 'newUpperBound' && e.target.value.length > 0) {
            this.setState({gotNewUpper: true});
        } else if (e.target.name === 'newUpperBound' && e.target.value.length < 1) {
            this.setState({gotNewUpper: false});
        }

        if (e.target.name === 'newLowerBound' && e.target.value.length > 0) {
            this.setState({gotNewLower: true});
        } else if (e.target.name === 'newLowerBound' && e.target.value.length < 1) {
            this.setState({gotNewLower: false});
        }

        if (e.target.name === 'newNumberOfNodes' && e.target.value.length > 0) {
            this.setState({gotNewNumberOfNodes: true});
        } else if (e.target.name === 'newNumberOfNodes' && e.target.value.length < 1) {
            this.setState({gotNewNumberOfNodes: false});
        }
*/

        //(this.state.gotNewName? this.setState({ nameForUpdate: this.state.newName}) : this.setState({ nameForUpdate: this.state.name}) );
        //(this.state.gotNewLower? this.setState({ lowerForUpdate: this.state.newLowerBound}) : this.setState({ lowerForUpdate: this.state.lowerBound}) );
        //(this.state.gotNewUpper? this.setState({ upperForUpdate: this.state.newUpperBound}) : this.setState({ upperForUpdate: this.state.upperBound}) );
        //(this.state.gotNewNumberOfNodes? this.setState({ numberOfNodesForUpdate: this.state.newNumberOfNodes}) : this.setState({ numberOfNodesForUpdate: this.state.numberOfNodes}) );


        //this.checkFormValidity();

    }


    onSubmit = (e) => {
        e.preventDefault();

        const updateFactory = [];

        // this.checkFormValidity();

        // build patch array of objects and generate new children if necessary
        if (this.state.gotNewName) {
            updateFactory.push({"propName": "name", "value": this.state.newName});
            //this.setState({ name: this.props.factory.newName });
            
            //this.setState({gotNewName: true});
        };

        if (this.state.gotNewUpper) {
            updateFactory.push({"propName": "upperBound", "value": this.state.newUpperBound});
            
            //this.setState({gotNewUpper: true});
        };

        if (this.state.gotNewLower) {
            updateFactory.push({"propName": "lowerBound", "value": this.state.newLowerBound});
            
            //this.setState({gotNewLower: true});
        };

        if (this.state.gotNewNumberOfNodes) {
            updateFactory.push({"propName": "numberOfNodes", "value": this.state.newNumberOfNodes});
            
            //this.setState({gotNewNumberOfNodes: true});
        };

        //if ((this.state.newNumberOfNodes!==this.state.numberOfNodes && this.state.newNumberOfNodes.length>0) || (this.state.newLowerBound!==this.state.lowerBound && this.state.newLowerBound.length>0) || (this.state.newUpperBound!==this.state.upperBound && this.state.newUpperBound.length>0) ) {
        if (this.state.gotNewLower || this.state.gotNewUpper|| this.state.gotNewNumberOfNodes) {


            var children = [];
            children = this.generateChildren(this.state.lowerBound, this.state.upperBound, this.state.numberOfNodes);
            updateFactory.push({"propName": "childNodes", "value": children})
        };

        var plainFactory = {};

        plainFactory = {
            name: this.state.nameForUpdate,
            lowerBound: this.state.lowerForUpdate,
            upperBound: this.state.upperForUpdate,
            children,
            numberOfNodes: this.state.numberOfNodesForUpdate
        };

        this.props.adjustFactory( this.state._id, updateFactory, plainFactory, this.state.nameForUpdate, this.state.lowerForUpdate, this.state.upperForUpdate, this.state.numberOfNodesForUpdate, children);
        this.props.updateThisFactory(this.state.nameForUpdate, this.state.upperForUpdate, this.state.lowerForUpdate, children, this.state.numberOfNodesForUpdate);
    }


    render() {
        const { _id, name, childNodes, upperBound, lowerBound } = this.props.factory;
        return (
            <div className="container">
                <h3>Adjust Factory</h3>
                <form onSubmit={this.onSubmit} >
                <TextField 
                    fullWidth
                    label="Name"
                    type="text" 
                    name="newName" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Factory Name"
                    value={this.state.newName}
                    onChange={this.onChange}
                />
                {(this.state.newNameIsValid)  ? null : <p className="inputWarning">Enter valid name</p>}
                <br/>
                <TextField
                    fullWidth
                    label="Lower"
                    type="number" 
                    name="newLowerBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Lower Bound"
                    value={this.state.newLowerBound}
                    onChange={this.onChange}
                    InputProps={{inputProps: { min: 0, max: Number(this.state.newUpperBound)-1}}}
                />
                {this.state.newLowerBoundIsValid  ? null : <p className="inputWarning">Enter positive integer</p>}
                <br/>
                <TextField
                    fullWidth
                    label="Upper"
                    type="number" 
                    name="newUpperBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Upper Bound"
                    value={this.state.newUpperBound}
                    onChange={this.onChange}
                    InputProps={{inputProps: { min:  Number(this.state.newLowerBound)+1 /*!=="" ?  : */, max: 1000000}}}
                />
                {this.state.newUpperBoundIsValid  ? null : <p className="inputWarning">Enter positive integer</p>}
                <br/>
                <TextField
                    fullWidth
                    label="Nodes"
                    type="number" 
                    min="0"
                    max="15"
                    name="newNumberOfNodes" 
                    style={{ flex: '12', padding: '5px' }}
                    placeholder="Number of Nodes"
                    value={this.state.newNumberOfNodes}
                    onChange={this.onChange}
                />
                {this.state.newNumberOfNodesIsValid  ? null : <p className="inputWarning">Enter positive integer</p>}
                <br/>
                <Button
                    fullWidth
                    onClick={this.props.adjustFactory.bind(this, _id)}
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
