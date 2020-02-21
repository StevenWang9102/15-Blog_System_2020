import React from "react";
import { connect } from "react-redux";
import { setUser } from '../../Components/UserComponent/AuthToken'
import {
  Link,
} from "react-router-dom";

const InternalSetting = props => {
  return (
    <div className='auth-page'>
      <div className='settings-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>
              <h1 className='text-xs-center'>Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className='form-group'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='URL of profile picture'></input>
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Your Name'></input>
                  </fieldset>

                  <fieldset className='form-group'>
                    <textarea
                      className='form-control form-control-lg'
                      rows='8'
                      placeholder='Short bio about you'></textarea>
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Email'></input>
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='password'
                      placeholder='Password'></input>
                  </fieldset>

                  <button className='btn btn-lg btn-primary pull-xs-right'>
                    Update Settings
                  </button>

                  <hr className='hr-setting' />

                  <Link to='/home' className='logout-button'>
                    <button
                      className="btn btn-lg btn-danger"
                      onClick={() => setUser(null)}
                    >
                      click here to logout
                  </button>
                  </Link>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const Setting = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSetting);
