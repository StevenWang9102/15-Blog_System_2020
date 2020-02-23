import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar } from "./Components/NavbarComponent/Navbar";
import "./App.css";
import { loadGlobalFeeds } from "./ReduxStore/FeedDetails/feedActions";

const InternalApp = props => {
  
  return (
    <div className="App">
      <Navbar />
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    loadGlobalFeeds: () => {
      dispatch(loadGlobalFeeds());
    }
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(InternalApp);
