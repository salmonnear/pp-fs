import React, { Component } from 'react';
import Factory from './Factory';
import PropTypes from 'prop-types';




export class Factories extends Component {

    
    render() {

        return this.props.factories.map( (factory) => (

            <div className="container">
                    <Factory key = {factory._id} factory={factory} delFactory={this.props.delFactory}   />
            </div>
        ));


    }
}

// PropTypes
Factories.propTypes = {
    factories: PropTypes.array.isRequired,
    delFactory: PropTypes.func.isRequired,
}


export default Factories
