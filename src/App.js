import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Components/NavbarComponent/Navbar";
import "./App.css";

const InternalApp = props => {
  return (
    <div className='App'>
      <Navbar />
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const App = connect(mapStateToProps, mapDispatchToProps)(InternalApp);
