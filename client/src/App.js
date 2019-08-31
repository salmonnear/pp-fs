import React, { Component } from 'react';
import './App.css';
import Factories from './components/Factories';
import axios from 'axios';
import AddFactory from './components/AddFactory';
import io from 'socket.io-client';
import { number } from 'prop-types';
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

  generateChildren = (lower, upper, numOfNodes) => {
    var cNodes = [];
    var numbers = [];
    

    for (var i=0; i < this.state.numberOfNodesForUpdate; i++) {
        numbers.push(Math.random());
    };

    cNodes = numbers.map((num) => num = Number(this.state.lowerForUpdate) + Math.round(num*(this.state.upperForUpdate-this.state.lowerForUpdate)));

    //test array generation and mapping objects to them...
    const arr = [...Array(numOfNodes)].map((_, i) => i);
    console.log(arr);
    const testArr = [4,5,6,7];
    //return cNodes;
    //return arr;
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
    /*
    var name = String;
    var upperBound = Number;
    var lowerBound = Number;
    var childNodes = [];
    var numberOfNodes = Number;
    */
    axios 
        .patch(`/factories/${_id}`,   factory
      )
      .then( res => {
        //shallow copy of new factories array (state)


        const newFact = this.state.factories.slice()


        index = newFact.findIndex(obj => obj._id === _id);

//        const arr = [...Array(numberOfNodes)].map(( i) => i);
        //const arr = Array(numberOfNodes);
        //const arr = Array.apply(3, Array(numberOfNodes));
        //const arr = children.map()


        //var numbers = [];
        var numbers = [];
    

        for (var i=0; i < numberOfNodes; i++) {
            numbers.push(Math.random());
        };

        var cNodes = numbers.map((num) => num = Number(lower) + Math.round(num*(upper-lower)));


        newFact[index].name = name;
        newFact[index].lowerBound = lower;
        newFact[index].upperBound = upper;
        newFact[index].numberOfNodes = numberOfNodes;
        newFact[index].childNodes = cNodes;//children;//[1,2,3,4];

        this.setState({factories: newFact});

        //set state at index...

        //this.setState({
        //  factories: update(this.state.factories, {Number(index): name: {$set: name} });
/*
          this.state.factories[index].name = name;//'test';//factory[0].value;//regFactory;//factory.name;
          this.state.factories[index].lowerBound = lower;//1;//factory[1].value;//1;//factory.lowerBound;
          this.state.factories[index].upperBound = upper;//2;//factory[2].value;;//factory.upperBound;
          this.state.factories[index].numberOfNodes = numberOfNodes;//factory[3].value;;//factory.numberOfNodes;
          this.state.factories[index].childNodes = [1,2];

          this.forceUpdate();
*/

          /*
          this.setState({
            factories[index].childnodes: children
          })
        */



        /*
        this.state.factories[index].name = name;//'test';//factory[0].value;//regFactory;//factory.name;
        this.state.factories[index].lowerBound = lower;//1;//factory[1].value;//1;//factory.lowerBound;
        this.state.factories[index].upperBound = upper;//2;//factory[2].value;;//factory.upperBound;
        this.state.factories[index].numberOfNodes = numberOfNodes;//factory[3].value;;//factory.numberOfNodes;
        this.state.factories[index].childNodes = [1,2];//childrenN;//factory[4].value;;//factory.childNodes;
        this.forceUpdate();
*/



        //generate children nodes from upper, lower and num of nodes
        var childrenN = [];
        childrenN = this.generateChildren(lower, upper, numberOfNodes);

        //this.state.factories[index].childNodes = [1,25,6];//childrenN;
        console.log(res);
        console.log(typeof childrenN);
        
        console.log(childrenN);
        console.log(numberOfNodes);
        console.log(upper);
        console.log(lower);
        console.log(children);
        console.log(newFact);

        console.log(numbers);
        console.log(cNodes);
      }
      )
      //.then(index = this.state.factories.findIndex(obj => obj._id === _id))

        

/*
      this.state.factories[index].name = name;//'test';//factory[0].value;//regFactory;//factory.name;
      this.state.factories[index].lowerBound = lower;//1;//factory[1].value;//1;//factory.lowerBound;
      this.state.factories[index].upperBound = upper;//2;//factory[2].value;;//factory.upperBound;
      this.state.factories[index].numberOfNodes = numberOfNodes;//factory[3].value;;//factory.numberOfNodes;
      this.state.factories[index].childNodes = childrenN;//[1,2];//children;//factory[4].value;;//factory.childNodes;
      this.forceUpdate();
      */
      

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
