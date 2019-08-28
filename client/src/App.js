import React, { Component } from 'react';
import './App.css';
import Factories from './components/Factories';
import axios from 'axios';
import AddFactory from './components/AddFactory';
import io from 'socket.io-client';
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
            this.setState({ factories:[...this.state.factories, res.data.createdFactory] })
          });
        
  };


  delFactory = (_id) => {
    axios
      .delete(`/factories/${_id}`)
      .then(res =>
         this.setState({ 
           factories: [...this.state.factories.filter(factory => factory._id !== _id)]
          })
      );
  };


  adjustFactory = (_id, factory, regFactory, name, lower, upper, numberOfNodes, children) => {
    var index = Number;
    //var name = String;
    var upperBound = Number;
    var lowerBound = Number;
    var childNodes = [];
    var numberOfNodes = Number;
    axios 
        .patch(`/factories/${_id}`,   factory
      )
      .then( res => {
        console.log(res);
          }
      )
      .then(index = this.state.factories.findIndex(obj => obj._id === _id))

      this.state.factories[index].name = name;//'test';//factory[0].value;//regFactory;//factory.name;
      this.state.factories[index].lowerBound = lower;//1;//factory[1].value;//1;//factory.lowerBound;
      this.state.factories[index].upperBound = upper;//2;//factory[2].value;;//factory.upperBound;
      this.state.factories[index].numberOfNodes = numberOfNodes;//factory[3].value;;//factory.numberOfNodes;
      this.state.factories[index].childNodes = children;//factory[4].value;;//factory.childNodes;
      this.forceUpdate();

  };


  render() {
    return (

      <div className="App">
        <AddFactory addFactory={this.addFactory}/>
        <h1 className="headerLabel">Factories</h1>
        <Factories key={this.state.factories._id} factories = { this.state.factories } delFactory={ this.delFactory} adjustFactory={this.adjustFactory}/>

      </div>
    );

  }
  

}

export default App;
