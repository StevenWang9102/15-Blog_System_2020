import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Navbar from './Components/NavbarComponent/Navbar';

import { loadInitialData } from './ReduxStore/FeedDetails/feedActions';

const InternalApp = props => {
  useEffect(() => {
    props.loadInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Navbar />
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDismatchToProps = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(loadInitialData());
    }
  };
};

export const App = connect(mapStateToProps, mapDismatchToProps)(InternalApp);
