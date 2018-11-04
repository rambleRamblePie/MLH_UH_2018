import React, { Component } from 'react';

import DatePicker from "react-datepicker";
import moment from "moment";

// import logo from './logo.svg';
import './App.css';

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment()
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }
    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <p>Hi, tell us where you're coming from and where you're going</p>
          <form>
              <div class="form">
                  <div class="topForm">
                      <label htmlFor="origin">Origin:</label>
                      <input type="text" id="origin" name="origin_location"></input>
                  </div>
                  <div class="topForm">
                      <label htmlFor="destination">Destination:</label>
                      <input type="text" id="destination" name="destination_location"></input>
                  </div>

                  <p></p>
              <div class="bottomForm">
                  <label htmlFor="departureDate">Departure Date:</label>
                  <DatePicker
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}
                  />
              </div>
              <div class="bottomForm">
                  <label htmlFor="returnDate">Return Date:</label>
                  <DatePicker id={"returnDateSelector"}
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}
                      // excludeDates={[moment(), moment().to(this.startDate)]}
                      // placeholderText="Select a date other than today or yesterday"
                  />
              </div>
              <div className="bottomForm">
                  <input type="radio" name="tripType" value="roundtrip" checked/>
                  <label htmlFor="tripType">Roundtrip</label>
                  <input type="radio" name="tripType" value="oneway"/>
                  <label htmlFor="tripType">One-Way</label>

              </div>

              <div class="button">
                  <button type="submit"> Find Lowest Prices</button>
              </div>
              </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
