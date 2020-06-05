import React from "react";

export const Banner = props => {
  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1 className='logo-font'>Conduit <span>{process.env.REACT_APP_TITLE}</span></h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    </div>
  );
}