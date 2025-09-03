import React, { Component } from 'react'
import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
  pageSize = 8;
  apiKey = process.env.REACT_APP_NEWS_API; //store your api key here
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  } 

  
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} apiKey={this.apiKey} country="us" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>

    )
  }
}
