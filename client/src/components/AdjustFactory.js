import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

export class AdjustFactory extends Component {
    state = {
        name: '',
        newName: '',
        newNameSet: false,
        newNameIsDiff: false,
        newNameIsValid: true,
        upperBound: '',
        newUpperBound: '',
        newUpperBoundSet: false,
        newUpperBoundIsDiff: false,
        newUpperBoundIsValid: true,
        lowerBound: '',
        newLowerBound: '',
        newLowerBoundSet: false,
        newLowerBoundIsDiff: false,
        newLowerBoundIsValid: true,
        childNodes: '',
        newChildNodes: '',
        newChildNodesSet: false,
        newChildNodesIsDiff: false,
        newChildNodesIsValid: true,
        numberOfNodes: '',
        newNumberOfNodes: '',
        newNumberOfNodesSet: false,
        newNumberOfNodesIsDiff: false,
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

    setFormValidity = () => {
        /*
        if (this.state.newName.length>1) {
            this.setState({ newNameIsValid: true});
        }
        */
        if (this.state.newUpperBound.length>1 && typeof this.state.newUpperBound !== 'number') {
            this.setState({ newUpperBoundIsValid: false});
        }
        if (this.state.newLowerBound.length>1 && typeof this.state.newLowerBound !== 'number') {
            this.setState({ newLowerBoundIsValid: false});
        }
        if (this.state.newNumberOfNodes.length>1 && typeof this.state.newNumberOfNodes !== 'number') {
            this.setState({ newNumberOfNodesIsValid: false});
        }

        if (this.state.newNameIsValid && this.state.newUpperBoundIsValid && this.state.newLowerBoundIsValid && this.state.newNumberOfNodesIsValid) {
            this.setState({ allValid: true })
        }
    }


    setDiffs = () => {
        return true;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name === 'newUpperBound' && Number.isInteger(e.target.value)) {
            this.setState({ newUpperBoundIsValid: false });
        } else {
            this.setState({ newUpperBoundIsValid: true });
        }

    }

    onSubmit = (e) => {
        e.preventDefault();

/*
        this.setState({ newName: this.state.newName });
        this.setState({ newUpperBound: this.state.newUpperBound });
        this.setState({ newLowerBound: this.state.newLowerBound });
        this.setState({ newChildNodes: this.state.newChildNodes });
        this.setState({ newNumberOfNodes: this.state.newNumberOfNodes });
*/

        const updateFactory = [];


        // build patch array of objects
        if ((this.state.newNumberOfNodes!==this.state.numberOfNodes && this.state.newNumberOfNodes.length>0) || (this.state.newLowerBound!==this.state.lowerBound && this.state.newLowerBound.length>0) || (this.state.newUpperBound!==this.state.upperBound && this.state.newUpperBound.length>0) ) {
            var cNodes = [];
            var numbers = [];
    
            for (var i=0; i < this.state.newNumberOfNodes; i++) {
                numbers.push(Math.random());
            };
////this mutherfucker is concatenating and not adding...smh
            //cNodes = numbers.map((num) => num =  Math.ceil(((this.state.upperBound-this.state.lowerBound)*num) + this.state.lowerBound));
            cNodes = numbers.map((num) => num = Number(this.state.newLowerBound) + Math.round(num*(this.state.newUpperBound-this.state.newLowerBound)));//(num*(this.state.newUpperBound-this.state.newLowerBound+1)) + this.state.newLowerBound);          //Math.round(  ((this.state.newUpperBound-this.state.newLowerBound)*num) + this.state.newLowerBound)  ,0);
console.log(cNodes);
            if (cNodes.length > 1) {
                updateFactory.push({"propName": "childNodes", "value": cNodes})
            };
        };

        if (this.state.newName!==this.state.name && this.state.newName.length>0) {
            updateFactory.push({"propName": "name", "value": this.state.newName});
        };

        if (this.state.newUpperBound!==this.state.upperBound && this.state.newUpperBound.length>0) {
            updateFactory.push({"propName": "upperBound", "value": this.state.newUpperBound});
        };

        if (this.state.newLowerBound!==this.state.lowerBound && this.state.newLowerBound.length>0) {
            updateFactory.push({"propName": "lowerBound", "value": this.state.newLowerBound});
        };

        if (this.state.newNumberOfNodes!==this.state.numberOfNodes && this.state.newNumberOfNodes.length>0) {
            updateFactory.push({"propName": "numberOfNodes", "value": this.state.newNumberOfNodes});
        };

        console.log(updateFactory);


        console.log(numbers);
        console.log(cNodes);

        this.props.adjustFactory( this.state._id, updateFactory
        );

    }



    render() {
        const { _id, name, childNodes, upperBound, lowerBound } = this.props.factory;
        return (
            <div className="container">
                <h3>Adjust Factory</h3>
                <form onSubmit={this.onSubmit} >
                <TextField 
                    type="text" 
                    name="newName" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Factory Name"
                    value={this.state.newName}
                    onChange={this.onChange}
                />
                {(this.state.newNameIsValid)  ? null : <p className="inputWarning">Enter valid name</p>}
                <TextField
                    type="number" 
                    name="newLowerBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Lower Bound"
                    value={this.state.newLowerBound}
                    onChange={this.onChange}
                />
                {this.state.newLowerBoundIsValid  ? null : <p className="inputWarning">Enter positive integer</p>}
                <TextField
                    type="number" 
                    name="newUpperBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Upper Bound"
                    value={this.state.newUpperBound}
                    onChange={this.onChange}
                />
                {this.state.newUpperBoundIsValid  ? null : <p className="inputWarning">Enter positive integer</p>}
                <TextField
                    type="number" 
                    name="newNumberOfNodes" 
                    style={{ flex: '12', padding: '5px' }}
                    placeholder="Number of Nodes"
                    value={this.state.newNumberOfNodes}
                    onChange={this.onChange}
                />
                {this.state.newNumberOfNodesIsValid  ? null : <p className="inputWarning">Enter positive integer</p>}
                <br/>
                <Button
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
