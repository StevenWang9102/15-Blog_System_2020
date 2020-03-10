import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Containers/Navbar/Navbar";
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

const mapStateToProps = ({ eventReducer }) => {
  const { loading } = eventReducer;

  return {
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const App = connect(mapStateToProps, mapDispatchToProps)(InternalApp);
