import React from "react";
import { createUseStyles } from "react-jss";

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

  return (
    <div className='user-info'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <img
              src={
                props.currentProfileDetail && props.currentProfileDetail.image
              }
              className='user-img'
              alt='au'
            />
            <h4>{props.author_name}</h4>
            <p>
              {props.currentProfileDetail && props.currentProfileDetail.bio}
            </p>

            <Button>
              <i className='ion-plus-round'></i>
              <a
                className='nav-link'
                onClick={() => {
                  if (props.currentProfileDetail.following === false)
                    props.onFollowAuthorClick(props.author_name, "POST");
                  else props.onFollowAuthorClick(props.author_name, "DELETE");
                }}>
                <img src='./icon/004-settings.png' alt='' />
                {props.currentProfileDetail.following
                  ? `- Unfollow ${props.author_name}  `
                  : ` + Follow ${props.author_name} Now `}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
