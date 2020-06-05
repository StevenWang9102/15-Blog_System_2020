import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Containers/Navbar/Navbar";
import "./App.css";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  loading: {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: "0",
    top: "0",
    backgroundColor: "rgba(128, 128, 128, 0.219)",
    fontFamily: "'Kaushan Script', sans-serif",
    fontSize: "40px",
    opacity: "0.8",
    zIndex: "100",

    '& span': {
      position: "absolute",
      top: "420px"
    }
  },
});

const InternalApp = props => {

  const Loading = ({ children }) => {
    const classes = useStyles();
    return <div className={classes.loading}> <span> {children}</span> </div>;
  };

  return (
    <div className='App'>
      {props.loading === "LOADING" ? (
        <Loading> Loading...</Loading>
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
