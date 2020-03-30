import React from "react";

export const Banner = props => {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit - {process.env.REACT_APP_TITLE}</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    </div>
  );
};
