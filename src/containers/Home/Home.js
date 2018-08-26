import React, { Component } from 'react';
import HomeCard from './HomeCard';
import classes from './Home.css';
import Aux from '../../hoc/Auxi';

class Home extends Component {
  state ={
    libraries: ['library 1', 'library 2', 'library 3', 'library 4', 'library 5', 'library 6','library 6','library 6','library 6','library 6','library 6','library 6','library 6','library 6',],
    pageCount: 4,
    offset: 0,

  }

  render() {
    return (
      <Aux>
      <div className={classes.homecontainer}>
        <ol className={classes.homegrid}>
          {this.state.libraries.map((library) => (
            <li key={library}>
              <HomeCard library={library}/>
            </li>
          ))}
        </ol>       
        
      </div>    
      </Aux>  
    )
  }
}

export default Home;