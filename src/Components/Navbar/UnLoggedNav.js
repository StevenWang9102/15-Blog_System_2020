import React, { useState }  from "react";
import { Link } from "react-router-dom";

export const UnLoggedNav = props => {

  return (
    <div>
      <li className='nav-item'>
        <Link className='nav-link active' to='/home'>
          Home
        </Link>
      </li>

      <li className='nav-item'>
        <Link className='nav-link' to='/sign_in'>
          Sign in
        </Link>
      </li>

      <li className='nav-item'>
        <Link
          className='nav-link'
          to='/sign_up'
          onClick={() => {
            // props.onSignUpButtonClicked(null);
          }}>
          Sign up
        </Link>
      </li>
    </div>
  );
};
