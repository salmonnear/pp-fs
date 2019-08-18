import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Factories from './components/Factories';
import axios from 'axios';
import AddFactory from './components/AddFactory';
// import theme from './theme';

class App extends Component {
  state = {
    factories: []
  };

  
  componentDidMount() {
    console.log('test')
    axios
      .get('/factories')
        //.get('https://infinite-ridge-95212.herokuapp.com/3005/factories')
        //.get('http://localhost:3005/factories')
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


  // Delete Factory
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
  
 /*
 adjustFactory = (_id) => {
   //console.log(patchFactory);
   console.log(_id);
 }
*/


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
