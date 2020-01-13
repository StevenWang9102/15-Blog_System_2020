import React, { useEffect } from "react";
import { connect } from "react-redux";
import './App.css';
import Nav from './Components/Nav.js'
import { loadInitialData } from "./ReduxStore/FeedDetails/feedActions";


// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = (props) => {
  useEffect(() => {
    props.loadInitialData();
  }, [props]);

  return (
      <div className="App">
        <Nav/>
        {/* <MainPage/> */}
      </div>
  );
}

const mapStateToProps = ({ saveBookStore, usersBooksChanged, setStudentName }) => {
  return { saveBookStore, usersBooksChanged, setStudentName };
}; //@@@@@@@@@@@@@此处不对劲

const mapDismatchToProps = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(loadInitialData());
    },
  };
};

export default connect(mapStateToProps, mapDismatchToProps)(App);
