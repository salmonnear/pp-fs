import React, { Component } from 'react';
import AdjustFactory from './AdjustFactory';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Grid from '@material-ui/core/Grid';


export class Factory extends Component {
    state =  {
      name: '',
      upperBound: '',
      lowerBound: '',
      childNodes: [],
      numberOfNodes: ''
    };


    componentDidMount() {
      this.setState({
        name: this.props.factory.name,
        upperBound: this.props.factory.upperBound,
        lowerBound: this.props.factory.lowerBound,
        childNodes: this.props.factory.childNodes,
        numberOfNodes: this.props.factory.numberOfNodes
      })
    };

//doesn't seem necessary...
/*
    updateThisFactory = (inName, inUpper, inLower, [inChildren], inNum) => {
      this.setState({
        name: inName,
        upperBound: inUpper,
        lowerBound: inLower,
        childNodes: inChildren,
        numberOfNodes: inNum
      })
    }
*/

    render() {
        const { _id } = this.props.factory;
        var {   name, childNodes, upperBound, lowerBound } = this.props.factory;//this.state;//this.props.factory;
        
        return (
            <div key={_id}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography className="factTitle"><p key={_id}>{name}</p></Typography>
              </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            {/*<Grid>*/}
            {/*<Grid xs={4}>*/}
            <Typography /*key={name}*/>
            <p>Nodes</p> 
            
            
            {/*Array([1,2,5]).map((num) => {
                return <p>{num}</p>;
              })*/}


            {childNodes.map((num) => {
                return <p>{num}</p>;
              })}
            
            
            { /* {this.state.childNodes.map((num) => {
                return <p>{num}</p>;
              })}
              */
              }
              <br/>
              Upper: {upperBound}
              <br/>
              Lower: {lowerBound}
              <br/>
              <br/>
              <br/>

              <IconButton onClick={this.props.delFactory.bind(this, _id)} aria-label="delete" size="small"><DeleteIcon /></IconButton>
            </Typography>
            {/*</Grid>*/}
            {/*<Grid xs={8}>*/}



            {/*  maybe need to create function to set from adjustfactory? or can just use part of adjust FActory funciton */}
                {/*<AdjustFactory style={{alignContent: "right"}} key={_id} factory={this.props.factory} adjustFactory={this.props.adjustFactory}/>*/}
              <AdjustFactory 
                key={_id} 
                factory={this.props.factory} 
                adjustFactory={this.props.adjustFactory}
                updateThisFactory={this.updateThisFactory}
                />

            {/*</Grid>*/}
          {/*</Grid>*/}
        </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
        )
    }
}


export default Factory
