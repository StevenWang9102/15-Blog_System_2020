import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const SignInOptions = props => {
  
  let history = useHistory();

  return (
    <div className='container page'>
      <div className='row'>
        <div className='col-md-12'>
          <Link to='sign_in' onClick={() => history.push("sign_in")}>
            <span> Sign in </span>
          </Link>
          or
          <Link to='sign_up'> Sign up </Link>
          to add comments on this article.
        </div>
      </div>
    </div>
  );
};
