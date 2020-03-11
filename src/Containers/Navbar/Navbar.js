import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {setDeleteArticleStatus} from "../../ReduxStore/Actions/articleActions"
import { LoggedUserNav } from "../../Components/Navbar/LoggedUserNav";
import { UnLoggedNav } from "../../Components/Navbar/UnLoggedNav";
import { Switcher } from "../../Components/Navbar/Switcher";

import {
  loadUserProfileDetail,
  userInformationLoaded,
  onSignUpButtonClicked
} from "../../ReduxStore/Actions/userActions";

import {
  setProfileNavStatus,
  postedArticleReloaded,
  updateSettingStatus,
  setLoading
} from "../../ReduxStore/Actions/eventActions";

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { getUserFromSession } from "../../Functions/AuthToken";

const InternalNavbar = props => {
  
  const getUserInformationLocal = () => {
    console.log('函数');
    
    if (
      !props.userInformation || !props.userInformation.token
    ) {
      const userInformationOnSession = getUserFromSession();
      if (userInformationOnSession) {
        props.userInformationLoaded({ user: userInformationOnSession });
      }
      return userInformationOnSession;
    } else {
      return props.userInformation;
    }
  };

  useEffect(() => {
    getUserInformationLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div>
        <nav className='navbar navbar-light'>
          <div className='container'>
            <Link className='navbar-brand' to='/home'>
              conduit
            </Link>

            <ul className='nav navbar-nav pull-xs-right'>
              {/* --------------- NAVIGATION --------------- */}
              {props.userInformation && props.userInformation.token ? (
                <LoggedUserNav
                  getUserInformationLocal={getUserInformationLocal}
                  userInformation={props.userInformation}
                  userInformationLoaded={props.userInformationLoaded}
                  postedArticleReloaded={props.postedArticleReloaded}
                  setDeleteArticleStatus={props.setDeleteArticleStatus}
                  loadUserProfileDetail={props.loadUserProfileDetail}
                  setProfileNavStatus={props.setProfileNavStatus}
                  setLoading={props.setLoading}
                />
              ) : (
                <UnLoggedNav
                  onSignUpButtonClicked={props.onSignUpButtonClicked}
                />
              )}
            </ul>
          </div>
        </nav>

        {/* --------------- ROUTER SWITCH --------------- */}
        <Switcher/>
      </div>
    </Router>
  );
};

InternalNavbar.propTypes = {
  userInformation: PropTypes.object,
  userInformationLoaded: PropTypes.func,
  loadUserProfileDetail: PropTypes.func
};

const mapStateToProps = ({ userReducer }) => {
  const { userInformation } = userReducer;

  return {
    userInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: (author_name, articleCountDisplay, articleOffSet) =>
      dispatch(
        loadUserProfileDetail(author_name, articleCountDisplay, articleOffSet)
      ),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    setProfileNavStatus: (profileNavStatusLeft, profileNavStatusRight) =>
      dispatch(
        setProfileNavStatus(profileNavStatusLeft, profileNavStatusRight)
      ),
    onSignUpButtonClicked: data => dispatch(onSignUpButtonClicked(data)),
    postedArticleReloaded: data => dispatch(postedArticleReloaded(data)),
    userInformationLoaded: user => dispatch(userInformationLoaded(user)),
    setLoading: status => dispatch(setLoading(status))
  };
};

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNavbar);
