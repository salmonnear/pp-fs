import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Factories from './components/Factories';
import axios from 'axios';
import AddFactory from './components/AddFactory';
import io from 'socket.io-client';
import {URI_DB} from './';
// import theme from './theme';
/*
const socket = io('/factories');
socket.on('factoryAdded', data => this.factoryAdded(data));
socket.on('factoryDeleted', data => this.factoryDeleted(data));
socket.on('factoryUpdated', data => this.factoryUpdated(data));
socket.on('cool msg', data => console.log('got a message!'));
*/
class App extends Component {
  state = {
    factories: []
  };

  
  componentDidMount() {
    console.log('test')
    axios
      .get('/factories')
        .then(res => this.setState({ factories: res.data.factories }));
  };




  addFactory = (newFactory) => {
    axios
        
        .post('/factories', {
                  
          name: newFactory.name,
          lowerBound: newFactory.lowerBound,
          upperBound: newFactory.upperBound,
          childNodes: newFactory.childNodes
          })

          .then(res => { 
            //console.log(res.data);
            this.setState({ factories:[...this.state.factories, res.data.createdFactory] })
          });
        
  }


  delFactory = (_id) => {
    axios
      .delete(`/factories/${_id}`)
      .then(res =>
         this.setState({ 
           factories: [...this.state.factories.filter(factory => factory._id !== _id)]
          })
      );
  };


  adjustFactory = (_id, factory) => {
    axios 
        .patch(`/factories/${_id}`,   factory
      )
      .then(response => 
            console.log(response));
  }


  render() {
    return (

      <div className="App" >
 
        <AddFactory addFactory={this.addFactory}/>
        <h1 className="headerLabel">Factories</h1>
        <Factories key={this.state.factories._id} factories = { this.state.factories } delFactory={ this.delFactory} adjustFactory={this.adjustFactory}/>

        
      </div>
    );

  }
  

}

export default App;
