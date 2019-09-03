import React, { Component } from 'react';
import './App.css';
import Factories from './components/Factories';
import axios from 'axios';
import AddFactory from './components/AddFactory';
import io from 'socket.io-client';
/*
const socket = io('/factories');
socket.on('factoryAdded', data => this.factoryAdded(data));
socket.on('factoryDeleted', data => this.factoryDeleted(data));
socket.on('factoryUpdated', data => this.factoryUpdated(data));
socket.on('cool msg', data => console.log('got a message!'));
*/
const socket = io('/');
socket.on('test', data => console.log(data))

class App extends Component {
  state = {
    factories: []
  };

  
  componentDidMount() {
    axios
      .get('/factories')
        .then(res => this.setState({ factories: res.data.factories }));
  };

  generateChildren = (lower, upper, numOfNodes) => {
    var cNodes = [];
    var numbers = [];
    

    for (var i=0; i < this.state.numberOfNodesForUpdate; i++) {
        numbers.push(Math.random());
    };

    cNodes = numbers.map((num) => num = Number(this.state.lowerForUpdate) + Math.round(num*(this.state.upperForUpdate-this.state.lowerForUpdate)));

    const arr = [...Array(numOfNodes)].map((_, i) => i);
    console.log(arr);
    const testArr = [4,5,6,7];
    return testArr;
}


  addFactory = (newFactory) => {
    axios
        .post('/factories', {
          name: newFactory.name,
          lowerBound: newFactory.lowerBound,
          upperBound: newFactory.upperBound,
          childNodes: newFactory.childNodes,
          numberOfNodes: newFactory.numberOfNodes
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

    axios 
        .patch(`/factories/${_id}`,   factory
      )
      .then( res => {
        //shallow copy of new factories array (state)

        const newFact = this.state.factories.slice()

        index = newFact.findIndex(obj => obj._id === _id);

        var numbers = [];

        for (var i=0; i < numberOfNodes; i++) {
            numbers.push(Math.random());
        };

        var cNodes = numbers.map((num) => num = Number(lower) + Math.round(num*(upper-lower)));


        if (name) { newFact[index].name = name};
        if (lower) {newFact[index].lowerBound = lower};
        if (upper) {newFact[index].upperBound = upper};
        if (numberOfNodes) {newFact[index].numberOfNodes = numberOfNodes};
        if (cNodes) {newFact[index].childNodes = cNodes};

        this.setState({factories: newFact});

        //generate children nodes from upper, lower and num of nodes
        var childrenN = [];
        childrenN = this.generateChildren(lower, upper, numberOfNodes);

      }
      )
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
