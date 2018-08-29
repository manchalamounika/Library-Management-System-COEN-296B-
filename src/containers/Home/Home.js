import React, { Component } from 'react';
import './Home.css';
import Aux from '../../hoc/Auxi';
import HomeCardWrapped from './HomeCard';

class Home extends Component {
  state ={
    libraries: ['library 1', 'library 2', 'library 3', 'library 4', 'library 5', 'library 6','library 6','library 6','library 6','library 6','library 6','library 6','library 6','library 6',],
    pageCount: 4,
    offset: 0,

  }

  render() {
    return (
      <Aux>
      <div className='home-container'>
      <ol className='home-grid'>
          {this.state.libraries.map((library) => (
            <li key={library}>            
              <HomeCardWrapped library={library}/>
            </li>
          ))}
        </ol>      
      </div>    
      </Aux>  
    )
  }
}

export default Home;
