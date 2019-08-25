import React, { Component } from 'react';
import AdjustFactory from './AdjustFactory';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';



export class Factory extends Component {
    
    render() {

        const {  _id, name, childNodes, upperBound, lowerBound } = this.props.factory;
        
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
            <Typography key={name}>
              <p>Nodes</p>{childNodes.map((num) => {
                return <p>{num}</p>;
              })}
              <br/>
              Upper: {upperBound}
              <br/>
              Lower: {lowerBound}
              <br/>
              <IconButton onClick={this.props.delFactory.bind(this, _id)} aria-label="delete" size="small"><DeleteIcon /></IconButton>
            </Typography>

          <AdjustFactory key={_id} factory={this.props.factory} adjustFactory={this.props.adjustFactory}/>
              
          
        </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
        )
    }
}


export default Factory
