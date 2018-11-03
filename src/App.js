import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Hi, tell us where you're coming from and where you're going</p>
          <form>
              <div>
                  <label htmlFor="origin">Origin:</label>
                  <input type="text" id="origin" name="origin_location"></input>
              </div>
              <div>
                  <label htmlFor="destination">Destination:</label>
                  <input type="text" id="destination" name="destination_location"></input>
              </div>
              <div class="button">
                  <button type="submit"> Find Lowest Prices</button>
              </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
