import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
const useStyles = createUseStyles({
  myButton: {
    border: "0px",
    padding: "1px 7px 1px 5px"
  },
  "& a": {
    height: "5px",
    width: "5px"
  }
});

export const UserProfileTitle = props => {
  const Button = ({ children }) => {
    const classes = useStyles();
    return (
      <button
        className={`btn btn-sm btn-outline-secondary action-btn ${classes.myButton}`}>
        {children}
      </button>
    );
  };

  const profileDetails = props.currentProfileDetail;
  return (
    <div className='user-info'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <img
              src={profileDetails && profileDetails.image}
              className='user-img'
              alt='au'
            />
            <h4>{props.author_name}</h4>
            <p>{profileDetails && profileDetails.bio}</p>

            <Button>
              <span
                className='nav-link'
                onClick={() => {
                  if (props.userInformation.username) {
                    if (profileDetails.following === false)
                      props.onFollowAuthorClick(props.author_name, "POST");
                    else props.onFollowAuthorClick(props.author_name, "DELETE");
                  }
                }}>

                {props.userInformation.username === props.author_name ? (
                // Logged or not display differently
                  <span>
                    <Link to='/setting' className='nav-link'>Edit Profile Setting</Link>
                  </span>
                ) : (
                  <span>
                    {profileDetails.following
                      ? `- Unfollow ${props.author_name}  `
                      : ` + Follow ${props.author_name} Now `}
                  </span>
                )}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
