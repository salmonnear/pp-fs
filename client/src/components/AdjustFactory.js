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
        allValid: true,
        rangeIsValid: true,
        childrenForUpdate: []

    }



    componentDidMount() {
        this.setState({ numberOfNodes: this.props.factory.numberOfNodes,
                        childNodes: this.props.factory.childNodes,
                        lowerBound: this.props.factory.lowerBound,
                        upperBound: this.props.factory.upperBound,
                        name: this.props.factory.name,
                        _id: this.props.factory._id });

        this.setState({
                        nameForUpdate: this.state.name,
                        lowerForUpdate: this.state.lowerBound,
                        upperForUpdate: this.state.upperBound,
                        numberOfNodesForUpdate: this.state.numberOfNodes,
                        childrenForUpdate: this.state.childNodes
        })

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


    checkValidity = () => {

        //check upper vs lower...
        
            if (this.state.newUpperBound.length !== 0 && this.state.newLowerBound.length !== 0) {
                (Number(this.state.upperBound) > Number(this.state.lowerBound)
                    ? this.setState({
                        rangeIsValid: true
                    },this.checkAllValid())
                    : this.setState({
                        rangeIsValid: false
                    }, this.checkAllValid())
                    )
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
                        (this.state.gotNewLower? this.setState({ lowerForUpdate: this.state.newLowerBound},
                            (Number(this.state.lowerForUpdate) < Number(this.state.upperForUpdate)? this.setState({ newLowerBoundIsValid: true}) : this.setState({ newLowerBoundIsValid: false}))
                            ) : this.setState({ lowerForUpdate: this.state.lowerBound},
                                (Number(this.state.lowerForUpdate) < Number(this.state.upperForUpdate)? this.setState({ newLowerBoundIsValid: true}) : this.setState({ newLowerBoundIsValid: false}))
                                ) );
                        
                    });
                    
                } else if (targName === 'newLowerBound' && targVal.length < 1) {
                    this.setState({gotNewLower: false});
                }

                // for upper
                if (targName === 'newUpperBound' && targVal.length > 0) {
                    this.setState({gotNewUpper: true}, () => {
                        (this.state.gotNewUpper? this.setState({ upperForUpdate: this.state.newUpperBound},
                            (Number(this.state.upperForUpdate) > Number(this.state.lowerForUpdate)? this.setState({ newUpperBoundIsValid: true}) : this.setState({ newUpperBoundIsValid: false}))
                            ) : this.setState({ upperForUpdate: this.state.upperBound},
                                (Number(this.state.upperForUpdate) > Number(this.state.lowerForUpdate)? this.setState({ newUpperBoundIsValid: true}) : this.setState({ newUpperBoundIsValid: false}))
                                ) );
                        (Number(this.state.upperForUpdate) > Number(this.state.lowerForUpdate)? this.setState({ newUpperBoundIsValid: true}) : this.setState({ newUpperBoundIsValid: false}));
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


    }


    onSubmit = (e) => {
        e.preventDefault();

        const updateFactory = [];

        // build patch array of objects and generate new children if necessary
        if (this.state.gotNewName) {
            updateFactory.push({"propName": "name", "value": this.state.nameForUpdate});
        };

        if (this.state.gotNewUpper) {
            updateFactory.push({"propName": "upperBound", "value": this.state.upperForUpdate});
        };

        if (this.state.gotNewLower) {
            updateFactory.push({"propName": "lowerBound", "value": this.state.lowerForUpdate});
        };

        if (this.state.gotNewNumberOfNodes) {
            updateFactory.push({"propName": "numberOfNodes", "value": this.state.numberOfNodesForUpdate});
        };

        if (this.state.gotNewLower || this.state.gotNewUpper|| this.state.gotNewNumberOfNodes) {


            var children = [];
            children = this.generateChildren(this.state.lowerForUpdate, this.state.upperForUpdate, this.state.numberOfNodesForUpdate);
            updateFactory.push({"propName": "childNodes", "value": children});
            this.setState({ childrenForUpdate: children});
        };

        var plainFactory = {};

        plainFactory = {
            name: this.state.nameForUpdate,
            lowerBound: this.state.lowerForUpdate,
            upperBound: this.state.upperForUpdate,
            children: children,
            numberOfNodes: this.state.numberOfNodesForUpdate
        };

        this.props.adjustFactory( this.state._id, updateFactory, plainFactory, this.state.nameForUpdate, this.state.lowerForUpdate, this.state.upperForUpdate, this.state.numberOfNodesForUpdate, this.state.childrenForUpdate);

        console.log(children);
    }


    render() {
        var { _id, name, childNodes, upperBound, lowerBound } = this.props.factory;
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
                {this.state.newLowerBoundIsValid  ? null : <p className="inputWarning">Enter lower lower than new high or current high</p>}
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
                    InputProps={{inputProps: { min:  Number(this.state.newLowerBound)+1 , max: 1000000}}}
                />
                {this.state.newUpperBoundIsValid  ? null : <p className="inputWarning">Enter upper higher than new lower or current lower</p>}
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
                    InputProps={{inputProps: { min: 0, max: 15}}}
                />
                {this.state.newNumberOfNodesIsValid  ? null : <p className="inputWarning">Enter positive integer</p>}
                <br/>
                <Button
                    disabled= {!this.state.allValid}
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
