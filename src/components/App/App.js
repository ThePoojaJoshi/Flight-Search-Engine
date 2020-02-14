

import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList } from 'react-tabs';
import ItemPage from '../ItemPage/ItemPage';
import {items} from '../../data/data';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        originCity: '',
        destCity: '',
        deptDate: '',
        retDate: '',
        passengerCount: 1,
        items: items
      };

      this.handleChangeDestCity = this.handleChangeDestCity.bind(this);
      this.handleChangeOriginCity = this.handleChangeOriginCity.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.handlePassengerCountChange = this.handlePassengerCountChange.bind(this);
      this.handleStartDateChange = this.handleStartDateChange.bind(this);
      this.handleEndDateChange = this.handleEndDateChange.bind(this);
      this.findByMatchingProperties = this.findByMatchingProperties.bind(this);

    }

  handleChangeOriginCity(event) {
      const objToMatch = {
        originCity: event.target.value
      };

      const filteredData = this.findByMatchingProperties(items, objToMatch);
      if( filteredData.length !== 0 ) {
        this.setState({
          originCity: event.target.value,
          items: filteredData
        });
      }
  }

  handleChangeDestCity(event) {
      const destCity = event.target.value && "";
      const objToMatch = {
        originCity: this.state.originCity,
        destCity: event.target.value
      };

      const filteredData = this.findByMatchingProperties(items, objToMatch);

      if( filteredData.length !== 0) {
        this.setState({
          destCity: event.target.value,
          items: filteredData
        });
      }
  }

  handleSubmit(event) {
    alert("Results filtered");
    event.preventDefault();
  }

  handleSelect(index, last) {
    this.setState({
      selectedTab: index
    });
  }

  handlePassengerCountChange(event) {
      this.setState({passengerCount: event.target.value});
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  findByMatchingProperties(arrObj, matchingObj) {
      return arrObj.filter(function (entry) {
          return Object.keys(matchingObj).every(function (key) {
              return (entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0);
          });
      });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  render() {

    var originCity = this.state.originCity ? this.state.originCity : "";
    var destCity = this.state.destCity ? this.state.destCity : "";
    var headerElem = "";
    var startDate = this.state.startDate ? "Depart: " + this.state.startDate.toString().slice(4, 15) : "";
    if(!!originCity && !!destCity) {
       headerElem =
          <div>
            <h5> {originCity} > {destCity} </h5>
          </div>
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Flight Search Engine</h2>
        </div>
        <div className="container">
          <div className="one-third column">
              <Tabs onSelect={this.handleSelect}>
                <TabList>
                  <Tab>One Way</Tab>
                </TabList>

                  <div className="Item">
                    <form onSubmit={this.handleSubmit}>
                        <input className="row" type="text" value={this.state.originCity} onChange={this.handleChangeOriginCity} placeholder="Enter Origin City" />
                        <input className="row" type="text" value={this.state.destCity} onChange={this.handleChangeDestCity} placeholder="Enter Destination City"/>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            placeholderText="Departure Date" />
                        <input className="row" type="text" value={this.state.passengerCount} onChange={this.handlePassengerCountChange} placeholder="Passengers"/>
                      <input type="submit" value="Search" />
                    </form>
                  </div>

              </Tabs>

              <div class="slidecontainer">
                  <label><h4>Refine Flight Search</h4></label>
                  <input type="range" min="1" max="10000" value="5000" class="slider" id="myRange" />
              </div>
          </div>
          <div className="two-thirds column">
            <div className="header">
                <div className="Item-left">
                  {headerElem}
                </div>
                <div className="Item-right">
                  {startDate}
                </div>
            </div>
            <ItemPage
              items={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
