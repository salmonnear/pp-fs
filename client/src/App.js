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
    axios
        .get('http://localhost:3004/factories')
        .then(res => this.setState({ factories: res.data.factories }));
  };

  addFactory = (newFactory) => {
    axios
        .post('http://localhost:3004/factories', {
                  
          name: newFactory.name,
          lowerBound: newFactory.lowerBound,
          upperBound: newFactory.upperBound,
          childNodes: newFactory.childNodes
          })

          .then(res => { 
            //res.data.id = uuid.v4();
            //console.log(res.data);
            this.setState({ factories:[...this.state.factories, res.data.createdFactory] })
          });
        
  }


  // Delete Factory
  delFactory = (_id) => {
    axios
      .delete(`http://localhost:3004/factories/${_id}`)
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
