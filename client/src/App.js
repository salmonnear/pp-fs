import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Factories from './components/Factories';
import axios from 'axios';
import AddFactory from './components/AddFactory';

class App extends Component {
  state = {
    factories: []
  };

  
  componentDidMount() {
    console.log('test')
    axios
      .get('3005/factories')
        //.get('https://infinite-ridge-95212.herokuapp.com/3005/factories')
        //.get('http://localhost:3005/factories')
        .then(res => this.setState({ factories: res.data.factories }));
  };

  addFactory = (newFactory) => {
    axios
        
        .post('https://infinite-ridge-95212.herokuapp.com/3005/factories', {
        //.post('http://localhost:3005/factories', {
                  
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


  // Delete Factory
  delFactory = (_id) => {
    axios
      .delete(`https://infinite-ridge-95212.herokuapp.com/3005/factories/${_id}`)
      //.delete(`http://localhost:3005/factories/${_id}`)
      .then(res =>
         this.setState({ 
           factories: [...this.state.factories.filter(factory => factory._id !== _id)]
          })
      );
  };


  updateFactory = (_id) => {
    axios 
        .patch(`https://jsonplaceholder.typicode.com/todos/${_id}`,   [
        {"propName": "name", "value": "first and best factory" },
        {"propName": "lowerBound", "value": "3"}
      ]
      )
      .then(response => 
            console.log(response));
  }
  



  render() {
    return (
      <div className="App" >
 
        <AddFactory addFactory={this.addFactory}/>
        <h1 className="headerLabel">Factories</h1>
        <Factories key={this.state.factories._id} factories = { this.state.factories } delFactory={ this.delFactory}/>

        
      </div>
    );

  }
  

}

export default App;
