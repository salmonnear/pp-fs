import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

export class AdjustFactory extends Component {
    state = {
        name: '',
        newName: '',
        newNameSet: false,
        newNameIsDiff: false,
        upperBound: '',
        newUpperBound: '',
        newUpperBoundSet: false,
        newUpperBoundIsDiff: false,
        lowerBound: '',
        newLowerBound: '',
        newLowerBoundSet: false,
        newLowerBoundIsDiff: false,
        childNodes: '',
        newChildNodes: '',
        newChildNodesSet: false,
        newChildNodesIsDiff: false,
        numberOfNodes: '',
        newNumberOfNodes: '',
        newNumberOfNodesSet: false,
        newNumberOfNodesIsDiff: false,
        _id: ''

    }

    componentDidMount() {
        this.setState({ numberOfNodes: this.props.factory.numberOfNodes });
        this.setState({ childNodes: this.props.factory.childNodes });
        this.setState({ lowerBound: this.props.factory.lowerBound });
        this.setState({ upperBound: this.props.factory.upperBound });
        this.setState({ name: this.props.factory.name });
        this.setState({ _id: this.props.factory._id });
    }

    setDiffs = () => {
        return true;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ newName: this.state.newName });
        this.setState({ newUpperBound: this.state.newUpperBound });
        this.setState({ newLowerBound: this.state.newLowerBound });
        this.setState({ newChildNodes: this.state.newChildNodes });
        this.setState({ newNumberOfNodes: this.state.newNumberOfNodes });

        const updateFactory = [];



        if ((this.state.newNumberOfNodes!==this.state.numberOfNodes && this.state.newNumberOfNodes.length>0) || (this.state.newLowerBound!==this.state.lowerBound && this.state.newLowerBound.length>0) || (this.state.newUpperBound!==this.state.upperBound && this.state.newUpperBound.length>0) ) {
            var cNodes = [];
            var numbers = [];
    
            for (var i=0; i < this.state.newNumberOfNodes; i++) {
                numbers.push(Math.random());
            };

            cNodes = numbers.map((num) => num = Math.round(((this.state.upperBound-this.state.lowerBound)*num) + this.state.lowerBound),0);

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
            <div>
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
                <TextField
                    type="text" 
                    name="newLowerBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Lower Bound"
                    value={this.state.newLowerBound}
                    onChange={this.onChange}
                />
                <TextField
                    type="text" 
                    name="newUpperBound" 
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Upper Bound"
                    value={this.state.newUpperBound}
                    onChange={this.onChange}
                />
                <TextField
                    type="text" 
                    name="newNumberOfNodes" 
                    style={{ flex: '12', padding: '5px' }}
                    placeholder="Number of Nodes"
                    value={this.state.newNumberOfNodes}
                    onChange={this.onChange}
                />
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
