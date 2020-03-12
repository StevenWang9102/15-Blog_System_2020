import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Components/NavbarComponent/Navbar";
import "./App.css";

const InternalApp = props => {
  return (
    <div className='App'>
      {props.loading === "LOADING" ? (
        <div className='loading_status'>
          <span>Loading...</span>
        </div>
      ) : null}
      <Navbar />
    </div>
  );
};

const mapStateToProps = ({ syncReducer, asyncReducer }) => {
  const { loading } = syncReducer;

  return {
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const App = connect(mapStateToProps, mapDispatchToProps)(InternalApp);
